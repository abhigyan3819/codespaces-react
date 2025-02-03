import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [currentChatUID, setcurrentChatUID] = useState(null);
  const changeCurrentChatUID = (UID) => {
    setcurrentChatUID(UID);
  };

  return (
    <GlobalStateContext.Provider value={{ currentChatUID, setcurrentChatUID }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
