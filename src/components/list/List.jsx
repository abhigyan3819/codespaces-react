import React from 'react'
import "./list.css"
import User from './userInfo/user'
import ChatList from './chatList/chatList'
const List = () => {
  return (
    <div className='list'>
      <User />
      <ChatList />
    </div>
  )
}

export default List