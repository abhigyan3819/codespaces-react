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
            <img src="./profile.png" alt="" />
            <div className='texts'> 
              <div className='name'>name</div>
              <div className='lastmsg'>msg</div>
            </div>
        </div>
        <div className='item'>
          <img src="./profile.png" alt="" />
          <div className='texts'>
            <div className='name'>name</div>
            <div className='lastmsg'>msg</div>
          </div>
        </div>
        <div className='item'>
          <img src="./profile.png" alt="" />
          <div className='texts'>
            <div className='name'>name</div>
            <div className='lastmsg'>msg</div>
          </div>
        </div>
        <div className='item'>
          <img src="./profile.png" alt="" />
          <div className='texts'>
            <div className='name'>name</div>
            <div className='lastmsg'>msg</div>
          </div>
        </div>
        <div className='item'>
          <img src="./profile.png" alt="" />
          <div className='texts'>
            <div className='name'>name</div>
            <div className='lastmsg'>msg</div>
          </div>
        </div>
        <div className='item'>
          <img src="./profile.png" alt="" />
          <div className='texts'>
            <div className='name'>name</div>
            <div className='lastmsg'>msg</div>
          </div>
        </div>
    </div>
  )
}

export default ChatList;