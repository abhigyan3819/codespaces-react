import React from 'react';
import './sidebar.css';
import { FaHome, FaUserFriends, FaCog, FaUser } from 'react-icons/fa';

const Sidebar = ({ setWindow }) => {
  return (
    <div className="sidebar">
      <div className="top-icons">
        <FaHome className="icon" title="Home" onClick={()=>setWindow("home")}/>
        <FaUserFriends className="icon" title="Friends" onClick={()=>setWindow("friends")} />
      </div>
      <div className="bottom-icons">
        <FaCog className="icon" title="Settings" />
        <FaUser className="icon" title="Account" />
      </div>
    </div>
  );
};

export default Sidebar;
