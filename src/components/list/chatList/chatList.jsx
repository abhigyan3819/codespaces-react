import React, { useEffect, useState } from 'react';
import "./chatList.css";
import { auth, db } from '../../../backend/firebase';
import { collection, query, where, orderBy, onSnapshot, getDoc, doc, getDocs } from "firebase/firestore"; 
import { useGlobalState } from "../../../backend/globalStates"

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { changeCurrentChatUID, updateMessages} = useGlobalState()
  
  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <input type="search" placeholder='Search'/>
        </div>
      </div>
      {chats?.map((chat) => (
        <div key="chat.chatID" className='item' >
          <img src="./profile.png" alt="Profile" />
          <div className='texts'>
            <div className='name'>chat.username</div>
            <div className='lastmsg'>chat.lastMessage</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
