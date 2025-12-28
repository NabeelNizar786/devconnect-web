import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import AuthLoader from "./AuthLoader";

const Body = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user, authChecked } = useSelector((store) => store.user);
  const [showLoader, setShowLoader] = React.useState(true);

  const fetchUser = async () => {
    try {
      const result = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(result.data));
    } catch (error) {
      if (error.status == 401) {
        dispatch(removeUser());
      }
    }
  };

  useEffect(() => {
    if (!authChecked) {
      fetchUser();
    }
  }, [authChecked]);

  // ⬇️ delay hiding loader
  useEffect(() => {
    if (authChecked) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [authChecked]);

  if (showLoader) {
    return <AuthLoader />; // or spinner
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
