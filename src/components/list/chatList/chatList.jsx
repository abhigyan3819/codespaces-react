import React from 'react'
import "./chatList.css"
const ChatList = () => {
  return (
    <div className='chatList'>
        <div className='search'>
            <div className='searchBar'>
                <input type="search" placeholder='Search'/>
            </div>
        </div>
        <div className='item'>
            <div className='name'></div>
            <div className='lastmsg'></div>
        </div>
    </div>
  )
}

export default ChatList