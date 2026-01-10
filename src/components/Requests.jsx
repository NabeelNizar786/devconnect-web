import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const handleRequests = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(result?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold text-gray-300">
          No pending requests
        </h1>
        <p className="text-gray-500 mt-2">You’re all caught up</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-14">
      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/20 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white">Connection Requests</h1>
        <p className="text-gray-400 mt-3">
          People who want to connect with you
        </p>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="
                group relative rounded-3xl p-6
                bg-white/5 backdrop-blur-xl
                border border-white/10
                shadow-lg
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40
              "
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={photoUrl || "/default-avatar.png"}
                    alt={firstName}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50"
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-yellow-400 rounded-full ring-2 ring-base-300" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-400">
                      {age} • {gender}
                    </p>
                  )}
                </div>
              </div>

              {/* About */}
              {about && (
                <p className="mt-4 text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {about}
                </p>
              )}

              {/* Divider */}
              <div className="my-5 h-px bg-white/10" />

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleRequests("rejected", request._id)}
                  className="
                    flex-1 text-sm font-medium
                    px-4 py-2 rounded-full
                    bg-red-500/10 text-red-400
                    hover:bg-red-500 hover:text-white
                    transition
                  "
                >
                  Reject
                </button>

                <button
                  onClick={() => handleRequests("accepted", request._id)}
                  className="
                    flex-1 text-sm font-medium
                    px-4 py-2 rounded-full
                    bg-green-500/10 text-green-400
                    hover:bg-green-500 hover:text-white
                    transition
                  "
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;