import React, { useEffect, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react'
import { useGlobalState } from '../../backend/globalStates'

const Chat = () => {
 
  const { currentChatUID, messages} = useGlobalState()

  const[open, setOpen] = useState(false)
  const[text, setText] = useState("")
  const handleEmoji =(emoji) =>{
    setText((prev) => prev+emoji.emoji)
    setOpen(false)
  }
  useEffect(async ()=>{
    if(currentChatUID){
      const ids = currentChatUID.split("_")
      const otherUserUID = ids.filter(uid => uid !== currentUser.uid)[0]; 
      const userDocRef = doc(db, "users", otherUserUID);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
      }
    }
    const messagesRef = collection(db, "chats", currentChatUID, "messages");
    const q = query(messagesRef); 

    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        handleNewMessage({
          id: change.doc.id,
          ...change.doc.data(),
        });
      }
    });
  });
  },[])
  return (
  currentChatUID ? (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./profile.png" alt="" />
          <div className='name'>userData?.username</div>
        </div>
      </div>
      <div className="center">
        {messages?.map((msg)=>{
        <div className="message">
          <div className='texts'>
            <p>msg.text</p>
            <div>msg.timestamp</div>
          </div>
        </div>
      </div>
      })}
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message...' onChange={(e)=>setText(e.target.value)} value={text}/>
        <div className='emoji'>
          <img src="./emoji.png" alt="" onClick={()=>setOpen((prev)=>!prev)} />
          {open && (  
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji}/>
            </div>
          )}
        </div>
        <button type="button" className='sendButton'>Send</button>
      </div>
    </div>
  ) : (
    <div className='chat no-chat'>No chat selected</div>
  )
);
}

export default Chat;
