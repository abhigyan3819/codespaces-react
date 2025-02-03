import React, { useEffect, useState } from 'react'
import "./user.css"
import { fetchUserData } from '../../../backend/userInfo'  
import { auth } from '../../../backend/firebase'

const User = () => {
  const [userData, setUserData] = useState(null);  
  const uid = auth.currentUser?.uid; 

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const data = await fetchUserData(uid);  
        setUserData(data);  
      }
    };

    fetchData(); 
  }, [uid]);  

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='userInfo'>
        <div className='user'>
            <img src="./profile.png" alt="pic" />
            <div className='name'>{userData.username}</div> 
        </div>
    </div>
  );
}

export default User;
