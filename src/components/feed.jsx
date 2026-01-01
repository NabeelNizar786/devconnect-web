import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const controls = useAnimation();

  // motion values
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const getFeed = async () => {
    if (feed) return;
    const result = await axios.get(BASE_URL + "/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(result?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No More Users Available Now</h1>
      </div>
    );

  const swipe = async (dir) => {
    const toX = dir === "right" ? 500 : -500;

    await controls.start({
      x: toX,
      rotate: dir === "right" ? 20 : -20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 22,
      },
    });

    controls.set({ x: 0, rotate: 0, opacity: 1 });
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 120 || velocity > 800) swipe("right");
    else if (offset < -120 || velocity < -800) swipe("left");
    else {
      controls.start({
        x: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      });
    }
  };

  return (
    <div className="my-20 flex justify-center">
      <motion.div
        key={feed[0]?.id}
        style={{ x, rotate }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.35}
        dragMomentum={false}
        whileDrag={{ scale: 1.03 }}
        onDragEnd={handleDragEnd}
      >
        <UserCard
          user={feed[0]}
          onAccept={() => swipe("right")}
          onReject={() => swipe("left")}
        />
      </motion.div>
    </div>
  );
};

export default Feed;
