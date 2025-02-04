import React, { useEffect, useState } from 'react';
import "./chatList.css";
import { auth, db } from '../../../backend/firebase';
import { collection, query, where, orderBy, onSnapshot, getDoc, doc, getDocs } from "firebase/firestore"; 
import { useGlobalState } from "../../../backend/globalStates"

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { changeCurrentChatUID, updateMessages} = useGlobalState()

  const changeCurrentChat = async(UID) =>{
    changeCurrentChatUID(UID)
    const messagesRef = collection(db, "chats", UID, "messages");
    const querySnapshot = await getDocs(messagesRef);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data(), 
    }));
    updateMessages(messages)
  }
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const chatQuery = query(
      collection(db, "chats"),
      where("users", "array-contains", currentUser.uid),
      orderBy("lastMessageTimestamp", "desc")
    );

    const unsub = onSnapshot(chatQuery, async (querySnapshot) => {
      const chatList = [];
      for (const chatDoc of querySnapshot.docs) {
        const chatData = chatDoc.data();
        const otherUserUID = chatData.users.filter(uid => uid !== currentUser.uid)[0]; 

        const userDocRef = doc(db, "users", otherUserUID);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const lastMessage = chatData.lastMessage || "";
          chatList.push({
            chatID: chatDoc.id,
            username: userData.username,
            lastMessage,
            lastMessageTimestamp: chatData.lastMessageTimestamp,
          });
        }
      }

      setChats(chatList);
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
      {chats?.map((chat) => (
        <div key={chat.chatID} className='item' onClick={()=>changeCurrentChat(chat.chatID)}>
          <img src="./profile.png" alt="Profile" />
          <div className='texts'>
            <div className='name'>{chat.username}</div>
            <div className='lastmsg'>{chat.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
