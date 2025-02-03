import React, { useEffect, useState } from 'react';
import "./chatList.css";
import { auth, db } from '../../../backend/firebase';
import { doc, getDoc, onSnapshot } from "firebase/firestore"; 

const ChatList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return; 

    const userDocRef = doc(db, "users", currentUser.uid);

    const unsub = onSnapshot(userDocRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const friendsUIDs = userData.friends || [];

        const friendsData = await Promise.all(
          friendsUIDs.map(async (friendUID) => {
            const friendDocRef = doc(db, "users", friendUID);
            const friendSnapshot = await getDoc(friendDocRef);
            return friendSnapshot.exists() ? friendSnapshot.data() : null;
          })
        );
        setFriends(friendsData.filter(friend => friend !== null));
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <input type="search" placeholder='Search'/>
        </div>
      </div>
      {friends.map((friend, index) => (
        <div key={friend.id} className='item'>
          <img src="./profile.png" alt="Profile" />
          <div className='texts'>
            <div className='name'>{friend.username}</div>
            <div className='lastmsg'>Last message...</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
