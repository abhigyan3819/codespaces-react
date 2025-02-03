import React, { useEffect, useState } from 'react'
import "./chatList.css"
import { auth } from '../../../backend/firebase'
import { fetchUserData } from '../../../backend/userInfo'
const ChatList = () => {
  const uid = auth.currentUser.uid
  const [user, setUser] = useState(null)
  const [friendsUID, setFriendsUID] = useState([])
  const [friends, setFriends] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      if(uid){
        const data = await fetchUserData(uid)
        setUser(data)
        setFriendsUID(user?.friends)
        for(const friendUID in friendsUID){
          try {
            const userDocRef = doc(db, "users", friendUID);    
            const docSnapshot = await getDoc(userDocRef);    
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setFriendsUID(userData)
            } else {
              console.log("unknown user");
            }
          } catch (err) {
            console.log(err)
          }
        }
    }
  } 
  fetchData()
  },[uid])
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