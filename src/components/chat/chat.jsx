import React from 'react'
import "./chat.css"
const Chat = () => {
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./profile.png" alt="" />
          <div className='name'>name</div>
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          <img src="./image" alt="" />
        </div>
        <input type="text" placeholder='Type a message...'/>
        <div className='emoji'>
          <img src="./emoji" alt="" />
        </div>
        <button type="button" className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat