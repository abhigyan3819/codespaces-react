import React from 'react'
import "./user.css"
import userInfo from '../../../backend/userInfo'
const User = () => {
  const user = userInfo()
  return (
    <div className='userInfo'>
        <div className='user'>
            <img src="./profile.png" alt="pic" />
            <div></div>
        </div>
    </div>
  )
}

export default User