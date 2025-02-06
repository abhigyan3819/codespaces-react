import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./account.css";

const Account = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEditProfile = () => {
    // Handle profile picture update
    console.log("Open file manager for image selection");
  };

  const handleDeleteProfilePic = () => {
    // Handle profile picture deletion
    console.log("Profile picture deleted");
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
  };

  return (
    <div className="account-container">
      <h2 className="account-title">My Account</h2>
      <div className="account-card">
        {/* Blue Banner */}
        <div className="account-banner"></div>

        {/* Profile Picture Section */}
        <div className="profile-section">
          <img src="./profile.png" alt="Profile" className="profile-pic" />
          <button className="icon-btn delete-btn" onClick={handleDeleteProfilePic}>
            <FaTrash />
          </button>
          <button className="icon-btn edit-btn" onClick={handleEditProfile}>
            <FaPencilAlt />
          </button>
        </div>

        {/* Info Section */}
        <div className="account-info">
          <div className="info-item">
            <span className="label">Username</span>
            <span className="value">JohnDoe</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">johndoe@example.com</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          <button className="delete-account-btn" onClick={() => setShowPopup(true)}>Delete Account</button>
        </div>
      </div>

      {/* Delete Account Confirmation Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Do you want to delete this account?</p>
            <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            <button className="confirm-delete-btn" onClick={handleDeleteAccount}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
