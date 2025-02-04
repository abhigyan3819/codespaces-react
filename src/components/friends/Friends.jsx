import React, { useState } from 'react';
import './friends.css';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');

  return (
    <div className="friends-container">
      {/* Navigation Tabs */}
      <div className="tabs">
        <button className={activeTab === 'friends' ? 'active' : ''} onClick={() => setActiveTab('friends')}>Friends</button>
        <button className={activeTab === 'add' ? 'active' : ''} onClick={() => setActiveTab('add')}>Add</button>
        <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>Requests</button>
      </div>

      {/* Friends List */}
      {activeTab === 'friends' && (
        <div className="friends-list">
          <UserItem username="John Doe" profilePic="./profile.png" />
        </div>
      )}

      {/* Add Friends */}
      {activeTab === 'add' && (
        <div className="add-friends">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Search</button>
          </div>
          <UserItem username="Jane Smith" profilePic="./profile.png" buttonText="Add Friend" />
        </div>
      )}

      {/* Friend Requests */}
      {activeTab === 'requests' && (
        <div className="friend-requests">
          <UserItem username="Mark Johnson" profilePic="./profile.png" />
        </div>
      )}
    </div>
  );
};

// Reusable User Item Component
const UserItem = ({ username, profilePic, buttonText }) => {
  return (
    <div className="user-item">
      <img src={profilePic} alt="Profile" />
      <span>{username}</span>
      {buttonText && <button>{buttonText}</button>}
    </div>
  );
};

export default Friends;
