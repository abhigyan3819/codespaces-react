import React, { useEffect, useState } from 'react'
import "./user.css"
import { fetchUserData } from '../../../backend/userInfo'  
import { auth } from '../../../backend/firebase'
import { useGlobalState } from '../../../backend/globalStates'

const User = () => {
  const { currentUserData } = useGlobalState();  
  const uid = auth.currentUser?.uid; 

  if (!currentUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='userInfo'>
        <div className='user'>
            <img src="./profile.png" alt="pic" />
            <div className='name'>{currentUserData.username}</div> 
        </div>
    </div>
  );
}

export default User;
