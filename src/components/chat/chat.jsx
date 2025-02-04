import React, { useEffect, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react'
import { useGlobalState } from '../../backend/globalStates'

const Chat = () => {
 
  const { currentChatUID, messages} = useGlobalState()
  const [ msgs, setmsgs] = useState(messages)
 
  return currentChatUID ? (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./profile.png" alt="" />
          <div className='name'>{userData?.username || "Unknown"}</div>
        </div>
      </div>
      <div className="center">
        {msgs?.map((msg) => (
          <div className="message" key={msg.id}>
            <div className='texts'>
              <p>{msg.text}</p>
              <div>{msg.timestamp?.toDate().toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message...' onChange={(e) => setText(e.target.value)} value={text} />
        <div className='emoji'>
          <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
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
}

export default Chat;
