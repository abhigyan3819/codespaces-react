import React, { useState } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa"; // Importing icons
import "./account.css";
import { signOut } from "firebase/auth";
import { auth } from "../../backend/firebase";

const Account = () => {
  const [showPopup, setShowPopup] = useState(false);
  const logOut = async()=>{
    await signOut(auth)
  }
  const handleEditPicture = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="account-container">
      {/* Profile Picture Section */}
      <div className="profile-section">
        <div className="profile-pic">
          <img src="./profile.png" alt="Profile" />
          <button className="remove-btn" title="Remove Picture">
            <FaTrash />
          </button>
          <button className="edit-btn" onClick={handleEditPicture} title="Edit Picture">
            <FaPencilAlt />
          </button>
          <input type="file" id="fileInput" style={{ display: "none" }} accept="image/*" />
        </div>
      </div>

      {/* User Details */}
      <div className="user-details">
        <p className="username">John Doe</p>
        <p className="email">johndoe@example.com</p>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="logout-btn" onClick={logOut}>Log Out</button>
        <button className="delete-btn" onClick={() => setShowPopup(true)}>Delete Account</button>
      </div>

      {/* Delete Confirmation Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Do you want to delete this account?</p>
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="confirm-delete">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
