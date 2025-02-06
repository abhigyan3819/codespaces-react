import React, { useState } from "react";
import { FaPencilAlt, FaTrash, FaSignOutAlt, FaUserTimes } from "react-icons/fa";
import "./account.css";

const Account = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEditProfilePic = () => {
    // Function to handle file selection
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      console.log("Selected image:", e.target.files[0]);
      // Handle image upload logic
    };
    input.click();
  };

  const handleDeleteProfilePic = () => {
    console.log("Profile picture deleted");
    // Handle delete profile picture logic
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    // Handle account deletion logic
  };

  return (
    <div className="account-container">
      <h2>My Account</h2>

      <div className="profile-section">
        <div className="profile-pic-container">
          <img src="./profile.png" alt="Profile" className="profile-pic" />
          <button className="delete-icon" onClick={handleDeleteProfilePic}>
            <FaTrash />
          </button>
          <button className="edit-icon" onClick={handleEditProfilePic}>
            <FaPencilAlt />
          </button>
        </div>
      </div>

      <div className="info-section">
        <div className="info-box">
          <span>USERNAME</span>
          <p>JohnDoe</p>
        </div>
        <div className="info-box">
          <span>EMAIL</span>
          <p>johndoe@example.com</p>
        </div>
      </div>

      <div className="button-section">
        <button className="logout-btn">
          <FaSignOutAlt /> Log Out
        </button>
        <button className="delete-btn" onClick={() => setShowPopup(true)}>
          <FaUserTimes /> Delete Account
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Do you want to delete this account?</p>
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="confirm-delete" onClick={handleDeleteAccount}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
