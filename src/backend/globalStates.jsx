import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';

const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [currentChatUID, setcurrentChatUID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null)
  const fetchUserData = async () =>{
    toast.success("function run")
   try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);    
    const docSnapshot = await getDoc(userDocRef);    
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      setCurrentUserData(userData);
      toast.success(userData.username)
    } else {
      setCurrentUserData(null)
    }
  } catch (err) {
    console.log(err)
  }
}
  const changeCurrentChatUID = (UID) => {
    setcurrentChatUID(UID);
  };
  const updateMessages = (messages) => {
    setMessages(messages);
  };
  useEffect(()=>{
    fetchUserData()
  },[])

  return (
    <GlobalStateContext.Provider value={ {currentUserData ,currentChatUID, changeCurrentChatUID, messages, updateMessages }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
