import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="navbar bg-base-100/80 backdrop-blur border-b border-base-300 px-6">
        {/* Left: Brand */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight hover:text-primary transition"
          >
            Dev<span className="text-primary">Connect</span>
          </Link>
        </div>

        {/* Right: User */}
        {user && (
          <div className="flex items-center gap-4">
            {/* User name */}
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <span className="text-sm font-medium">{user.firstName}</span>
              <span className="text-xs text-base-content/60">Developer</span>
            </div>

            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover:bg-base-200"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="User avatar" src={user.photoUrl} />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-base-100 p-2 shadow-xl"
              >
                <li>
                  <Link to="/profile">👤 Profile</Link>
                </li>
                <li>
                  <Link to="/connections">🤝 Connections</Link>
                </li>
                <li>
                  <Link to="/requests">📩 Requests</Link>
                </li>
                <li>
                  <Link to="/premium">⭐ Premium</Link>
                </li>

                <div className="divider my-1" />

                <li>
                  <button onClick={handleLogout} className="text-error">
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
