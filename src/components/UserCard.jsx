import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true, onAccept, onReject }) => {
  const dispatch = useDispatch();

  const handleRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div
        className="
          relative 
          w-full max-w-sm sm:max-w-md 
          h-120 sm:h-130
          rounded-2xl 
          overflow-hidden 
          bg-base-300 
          shadow-xl 
          transition-transform duration-300 
          hover:scale-[1.02]
        "
      >
        {/* Profile Image */}
        <img
          src={user.photoUrl}
          alt={user.firstName}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* User Info */}
        <div className="absolute bottom-28 left-4 right-4 text-white">
          <h2 className="text-xl sm:text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-sm sm:text-base mt-1 line-clamp-2 opacity-90">
            {user.about}
          </p>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="absolute bottom-5 left-0 right-0 px-4">
            <div className="flex gap-3">
              <button
                className="
                  btn 
                  btn-outline 
                  w-1/2 
                  hover:bg-error hover:text-white
                "
                onClick={() => {
                  onReject();
                  handleRequest("ignored", user._id);
                }}
              >
                Ignore
              </button>

              <button
                className="
                  btn 
                  btn-primary 
                  w-1/2
                "
                onClick={() => {
                  onAccept();
                  handleRequest("interested", user._id);
                }}
              >
                Interested
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
