import React, { useEffect, useState } from 'react';
import "./chat.css";
import EmojiPicker from 'emoji-picker-react';
import { useGlobalState } from '../../backend/globalStates';
import { auth, db } from '../../backend/firebase';
import { collection, doc, getDoc, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';

const Chat = () => {
  const { currentChatUID, messages } = useGlobalState();
  const [msgs, setMsgs] = useState(messages);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!currentChatUID) return;

    const fetchUserAndMessages = async () => {
      const ids = currentChatUID.split("_");
      const otherUserUID = ids.find(uid => uid !== auth.currentUser?.uid);
      if (!otherUserUID) return;

      const userDocRef = doc(db, "users", otherUserUID);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        setUserData(userDocSnapshot.data());
      }

      const messagesRef = collection(db, "chats", currentChatUID, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc")); 

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setMsgs(newMessages);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchUserAndMessages();
    return () => unsubscribe && unsubscribe();
  }, [currentChatUID]);

  const handleEmoji = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setOpen(false);
  };

  const sendMessage = async () => {
    if (!text.trim() || !currentChatUID || !auth.currentUser) return;

    const messagesRef = collection(db, "chats", currentChatUID, "messages");
    await addDoc(messagesRef, {
      sender: auth.currentUser.uid,
      text,
      timestamp: serverTimestamp(),
    });

    setText("");
  };

  return currentChatUID ? (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./profile.png" alt="Profile" />
          <div className='name'>{userData?.username || "Unknown"}</div>
        </div>
      </div>
      <div className="center">
        {msgs?.map((msg) => (
          <div className={auth.currentUser.uid === msg.sender ? "message own" : "message"} key={msg.id}>
            <div className='texts'>
              <p>{msg.text}</p>
              <div>{msg.timestamp?.toDate().toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="Attach" />
        </div>
        <input
          type="text"
          placeholder='Type a message...'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className='emoji'>
          <img src="./emoji.png" alt="Emoji" onClick={() => setOpen((prev) => !prev)} />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button type="button" className='sendButton' onClick={sendMessage}>Send</button>
      </div>
    </div>
  ) : (
    <div className='chat no-chat'>No chat selected</div>
  );
};

export default Chat;
