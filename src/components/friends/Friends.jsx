import React, { useState } from 'react';
import './friends.css';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [text, setText] = useState("");
  const [userData, setUserData] = useState(null)

  const addFriend =()=>{
    
  }
  const searchUser = async () => {
    if(text ==="")return;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", text));
  
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; 
        setUserData(userDoc); 
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting user UID:", error);
      return null;
    }
  }
  return (
    <div className="friends-container">
      <div className="tabs">
        <button className={activeTab === 'friends' ? 'active' : ''} onClick={() => setActiveTab('friends')}>Friends</button>
        <button className={activeTab === 'add' ? 'active' : ''} onClick={() => setActiveTab('add')}>Add</button>
        <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>Requests</button>
      </div>

      {activeTab === 'friends' && (
        <div className="friends-list">
          <UserItem username="John Doe" profilePic="./profile.png" />
        </div>
      )}

      {/* Add Friends */}
      {activeTab === 'add' && (
        <div className="add-friends">
          <div className="search-bar">
            <input type="text" placeholder="Search" onChange={(e) => setText(e.target.value)} />
            <button onClick={searchUser}>Search</button>
          </div>
          {userData && <UserItem username={userData.username} profilePic="./profile.png" buttonText="Add Friend" />}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="friend-requests">
          <UserItem username="Mark Johnson" profilePic="./profile.png" isRequest />
        </div>
      )}
    </div>
  );
};


const UserItem = ({ username, profilePic, buttonText, isRequest }) => {
  return (
    <div className="user-item">
      <img src={profilePic} alt="Profile" />
      <span>{username}</span>
      {buttonText && <button onClick={()=>{
        if(buttonText === "Add Friend"){
          addFriend()
        }
        }}>{buttonText}</button>}
      {isRequest && (
        <div className="request-buttons">
          <button className="accept">Accept</button>
          <button className="reject">Reject</button>
        </div>
      )}
    </div>
  );
};

export default Friends;
