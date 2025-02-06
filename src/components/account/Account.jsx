import React, { useState } from "react";
import { FaPencilAlt, FaTrash, FaSignOutAlt, FaUserSlash } from "react-icons/fa";
import "./account.css";

const Account = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEditProfile = () => {
    console.log("Open file manager for image selection");
  };

  const handleDeleteProfilePic = () => {
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
          <div className="profile-wrapper">
            <img src="./profile.png" alt="Profile" className="profile-pic" />
            <button className="icon-btn delete-btn" onClick={handleDeleteProfilePic}>
              <FaTrash />
            </button>
            <button className="icon-btn edit-btn" onClick={handleEditProfile}>
              <FaPencilAlt />
            </button>
          </div>
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
          <div className="button-group">
            <button className="small-btn logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Log Out
            </button>
            <button className="small-btn delete-account-btn" onClick={() => setShowPopup(true)}>
              <FaUserSlash /> Delete Account
            </button>
          </div>
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
