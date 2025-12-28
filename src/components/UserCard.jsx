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
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="">
          <img src={user.photoUrl} alt="Shoes" className="rounded-xl w-96 h-96 object-cover" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
          <p>{user.about}</p>
          {showActions && (
            <div className="card-actions my-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  onAccept();
                  handleRequest("interested", user._id);
                }}
              >
                Interested
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  onReject();
                  handleRequest("ignored", user._id);
                }}
              >
                Ignore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
