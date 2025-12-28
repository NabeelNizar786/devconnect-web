import React, { useState } from "react";
import UserCard from "./UserCard";
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
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const result = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(result?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">PhotoURL</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select appearance-none"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea"
                  placeholder={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
              <p className="text-red-600">{error}</p>
            </div>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, photoUrl, age, gender, about }}
        showActions={false}
      />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
