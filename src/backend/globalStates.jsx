import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [currentChatUID, setcurrentChatUID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); 
  
  const fetchUserData = async (user) => {
    if (!user) return; 
    try {
      const userDocRef = doc(db, "users", user.uid);    
      const docSnapshot = await getDoc(userDocRef);    

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setCurrentUserData(userData);
      } else {
        setCurrentUserData(null);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); 
      fetchUserData(user);  
    });

    return () => unsubscribe(); 
  }, []);

  const changeCurrentChatUID = (UID) => {
    setcurrentChatUID(UID);
  };

  const updateMessages = (messages) => {
    setMessages(messages);
  };

  return (
    <GlobalStateContext.Provider value={{ currentUser, currentUserData, currentChatUID, changeCurrentChatUID, messages, updateMessages }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
