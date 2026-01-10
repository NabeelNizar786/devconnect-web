import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const result = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(result?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError("Failed to save profile");
    }
  };

  return (
    <div className="mt-10 max-w-5xl mx-auto px-6 py-10 bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ===== LEFT: EDIT FORM ===== */}
        <div className="bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-white">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="input input-bordered bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="input input-bordered bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            className="input input-bordered mt-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
            placeholder="Profile Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              className="input input-bordered bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <select
              className="select select-bordered bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled value="">
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <textarea
            className="textarea textarea-bordered mt-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell developers about yourself..."
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          {error && <p className="text-red-400 mt-2">{error}</p>}

          <button
            className="btn w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white transition-all shadow-lg"
            onClick={saveProfile}
          >
            Save Changes
          </button>
        </div>

        {/* ===== RIGHT: PROFILE PREVIEW ===== */}
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-12 flex flex-col items-center text-center border border-gray-700 lg:sticky lg:top-24">
          <div className="relative w-48 h-48 mb-6">
            <img
              src={photoUrl || "/default-avatar.png"}
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-gray-700 shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
              onClick={() => setIsOpen(true)}
            />
          </div>

          {/* Modal / Lightbox */}
          {isOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={photoUrl || "/default-avatar.png"}
                alt="Profile Large"
                className="max-w-3xl max-h-[80vh] rounded-xl shadow-2xl animate-none"
              />
            </div>
          )}

          <h3 className="text-3xl font-bold text-white">
            {firstName} {lastName}
          </h3>

          <p className="text-gray-400 mt-2 text-lg">
            {age && `${age} yrs`} {gender && `• ${gender}`}
          </p>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">{about}</p>
        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-down">
            Profile updated successfully
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
