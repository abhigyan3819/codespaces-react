import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [currentChatUID, setcurrentChatUID] = useState(null);
  const [messages, setMessages] = useState(null);
  const changeCurrentChatUID = (UID) => {
    setcurrentChatUID(UID);
  };
  const updateMessages = (messages) => {
    setMessages(messages);
  };
  return (
    <GlobalStateContext.Provider value={{ currentChatUID, changeCurrentChatUID, messages, updateMessages }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
