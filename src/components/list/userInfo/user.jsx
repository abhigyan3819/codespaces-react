import React from 'react'
import "./user.css"
import { fetchUserData }from '../../../backend/userInfo'
import { auth } from '../../../backend/firebase'

const User = () => {
  const uid = auth.currentUser.uid
  const user = fetchUserData(uid)

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