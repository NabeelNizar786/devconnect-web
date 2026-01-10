import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(result?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-300">
            No connections yet
          </h1>
          <p className="text-gray-500 mt-2">
            Start exploring and connect with people 🚀
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-14">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/30 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Your Connections
        </h1>
        <p className="text-gray-400 mt-3">
          People you’ve successfully connected with
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="
                group relative rounded-3xl p-6
                bg-white/5 backdrop-blur-xl
                border border-white/10
                shadow-lg
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40
              "
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={photoUrl || "/default-avatar.png"}
                    alt={firstName}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50"
                  />
                  {/* Online dot (optional realism) */}
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-300" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white leading-tight">
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
              <div className="flex items-center justify-between">
                <button
                  className="
                    text-sm font-medium text-white
                    px-4 py-2 rounded-full
                    bg-primary/80
                    hover:bg-primary
                    transition
                  "
                >
                  View Profile
                </button>

                <button
                  className="
                    text-sm text-gray-400
                    hover:text-white
                    transition
                  "
                >
                  Message →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;