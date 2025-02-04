import React, { useState } from 'react'
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
return (
  currentChatUID ? (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./profile.png" alt="" />
          <div className='name'>name</div>
        </div>
      </div>
      <div className="center">    
        <div className="message">
          <div className='texts'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti eveniet voluptate dolores cumque, libero quidem expedita, enim ipsa reprehenderit, maxime iure! Atque, vel esse al</p>
            <div>1 pm</div>
          </div>
        </div>
      </div>
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
    <div>No chat selected</div>
  )
);


export default Chat
