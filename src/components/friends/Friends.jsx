import React, { useEffect, useState } from 'react';
import './friends.css';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../backend/firebase';
import { toast } from 'react-toastify';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [text, setText] = useState("");
  const [userData, setUserData] = useState(null);
  const [requests, setRequests] = useState([]);

  const addFriend = async () => {
    const uid = auth.currentUser.uid < userData.id 
      ? `${auth.currentUser.uid}_${userData.id}` 
      : `${userData.id}_${auth.currentUser.uid}`;

    await setDoc(doc(db, "friendRequests", uid), {
      sender: auth.currentUser.uid,
      receiver: userData.id,
      id: uid
    });

    setUserData(null);
  };

  const searchUser = async () => {
    setUserData(null);
    if (text === "") return;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", text));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUserData(userDoc.data());
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error getting user UID:", error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const requestRef = collection(db, "friendRequests");
      const q = query(requestRef, where("receiver", "==", auth.currentUser.uid));
      try {
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const requestList = await Promise.all(snapshot.docs.map(async (Doc) => {
            const requestData = Doc.data();
            const senderRef = doc(db, "users", requestData.sender);
            const senderSnap = await getDocs(senderRef);
            if (!senderSnap.empty) {
              const senderData = senderSnap.docs[0].data();
              return {
                id: requestData.id,
                senderName: senderData.username
              };
            }
            return null;
          }));

          setRequests(requestList.filter(req => req !== null)); 
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

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
          {userData && <UserItem username={userData.username} profilePic="./profile.png" buttonText="Add Friend" addFriend={addFriend} />}
        </div>
      )}

      {/* Friend Requests */}
      {activeTab === 'requests' && (
        <div className="friend-requests">
          {requests.map((req) => (
            <UserItem key={req.id} username={req.senderName} profilePic="./profile.png" isRequest uid={req.id} />
          ))}
        </div>
      )}
    </div>
  );
};

const UserItem = ({ username, profilePic, buttonText, isRequest, addFriend, uid }) => {
  const acceptRequest = async (id) => {
    console.log("Accepted request:", id);
  };

  return (
    <div className="user-item">
      <img src={profilePic} alt="Profile" />
      <span>{username}</span>
      {buttonText && <button onClick={addFriend}>{buttonText}</button>}
      {isRequest && (
        <div className="request-buttons">
          <button className="accept" onClick={() => acceptRequest(uid)}>Accept</button>
          <button className="reject">Reject</button>
        </div>
      )}
    </div>
  );
};

export default Friends;
