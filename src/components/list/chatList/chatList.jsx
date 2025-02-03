import React, { useEffect, useState } from 'react';
import "./chatList.css";
import { auth } from '../../../backend/firebase';
import { fetchUserData } from '../../../backend/userInfo';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from '../../../backend/firebase';

const ChatList = () => {
  const [user, setUser] = useState(null);
  const [friendsUID, setFriendsUID] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const data = await fetchUserData(uid);

        if (data) {
          setUser(data);
          setFriendsUID(data.friends); 

          const friendsData = await Promise.all(
            data.friends.map(async (friendUID) => {
              try {
                const userDocRef = doc(db, "users", friendUID);
                const docSnapshot = await getDoc(userDocRef);
                if (docSnapshot.exists()) {
                  return docSnapshot.data(); 
                } else {
                  console.log("Unknown user:", friendUID);
                  return null;
                }
              } catch (err) {
                console.log("Error fetching friend:", err);
                return null;
              }
            })
          );

          setFriends(friendsData.filter(friend => friend !== null));
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <input type="search" placeholder='Search'/>
        </div>
      </div>

      {friends.map((friend, index) => (
        <div key={index} className='item'>
          <img src="./profile.png" alt="Profile" />
          <div className='texts'>
            <div className='name'>{friend.username}</div>
            <div className='lastmsg'>Last message...</div> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
