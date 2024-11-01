import React, { useState, useEffect } from "react";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useUpdateUserMutation } from "../../../redux/slices/api/userApiSlice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {app} from "./config"


function Profile_Pic() {
  const { user } = useSelector((state) => state.auth);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    user?.profile?.imageUrl || "default_profile_pic_url"
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true); // New loading state
  const [updateUser] = useUpdateUserMutation();
  // UseEffect to load the updated profile picture from localStorage
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImageUrl");
    if (savedProfileImage) {
      setProfilePicture(`${savedProfileImage}?t=${new Date().getTime()}`);
      setIsImageLoading(true); // Set loading when image is being fetched
    }
  }, []); // Empty dependency array to run only on mount
  const toggleEditProfilePicture = () =>
    setIsEditingProfilePicture(!isEditingProfilePicture);
  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `profile-pictures/${user._id}-${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      setIsUploading(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const imageUrlWithTimestamp = `${downloadURL}?t=${new Date().getTime()}`;
          setProfilePicture(imageUrlWithTimestamp);
          setIsImageLoading(true); // Set loading when the new image is being loaded
          // Update Redux state and local storage
          const response = await updateUser({
            profile: { imageUrl: downloadURL },
          });
          if (response?.data?.user?.profile?.imageUrl) {
            localStorage.setItem("profileImageUrl", downloadURL); // Save image to localStorage
            setIsUploading(false);
            setIsEditingProfilePicture(false);
          }
        }
      );
    }
  };
  // Handle image load to hide spinner/placeholder
  const handleImageLoad = () => {
    setIsImageLoading(false); // Stop loading once the image is fully loaded
  };
  return (
    <div>
      <div className="border rounded-lg p-5 flex flex-col md:flex-row shadow-lg mt-5 gap-x-3 h-auto relative bg-white">
        <div className="relative">
          {/* Show a placeholder or spinner while the image is loading */}
          {isImageLoading && (
            <div className="w-24 h-24 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <CircularProgressbar
                value={uploadProgress}
                text={`${Math.round(uploadProgress)}%`}
                styles={buildStyles({
                  pathColor: "#00FF00",
                  textColor: "green",
                })}
              />
            </div>
          )}
          <img
            src={profilePicture}
            className={`w-24 h-24 md:w-20 md:h-20 rounded-full ${
              isImageLoading ? "hidden" : ""
            }`}
            alt="Profile"
            onLoad={handleImageLoad} // Trigger when the image loads
          />
          {isUploading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full">
              <CircularProgressbar
                value={uploadProgress}
                text={`${Math.round(uploadProgress)}%`}
                styles={buildStyles({
                  pathColor: "#00FF00",
                  textColor: "green",
                })}
              />
            </div>
          )}
          {isEditingProfilePicture && !isUploading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfilePictureChange}
              />
              <p className="text-white text-xs">Change</p>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-3 md:mt-0">
          <p className="font-bold text-lg md:text-base">
            Name : <span className="font-sans">{user.name}</span>{" "}
          </p>
          <p className="font-bold text-gray-400 text-sm md:text-base">
            ID : <span className="font-sans"> {user.employeeID} </span>{" "}
          </p>
          <p className=" font-bold text-sm text-gray-400">
            {" "}
            Role : <span  className="font-sans"> {user.role} </span>
          </p>
        </div>
        <div
          onClick={
            isEditingProfilePicture
              ? handleProfilePictureChange
              : toggleEditProfilePicture
          }
          className="border rounded-2xl absolute right-1 shadow-sm top-2 md:top-2 mt-6 text-xs text-gray-400 flex p-2 space-x-1 cursor-pointer hover:bg-gray-100 transition"
        >
          <p className="-mt-0.5">{isEditingProfilePicture ? "Save" : "Edit"}</p>
          <PiPencilSimpleLineBold />
        </div>
      </div>
    </div>
  );
}
export default Profile_Pic;
