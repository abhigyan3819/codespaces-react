import './App.css';
import Chat from './components/chat/chat';
import List from './components/list/List';
import Register from './components/register/register';
import { Notification } from './components/Notification';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from './backend/firebase';
import Loading from './components/loading/Loading';

function App() {
  const [user, setUser] = useState(null)
  const [IsLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user)=>{
      setUser(user)
      setIsLoading(false)
    })
    return () => unsub();
  },[])
  if(IsLoading)return <Loading/>
  return (
    <div className="container">
      {user ?( 
      <>
       <List/>
       <Chat/>
      </>):(
      <Register/>)}
      <Notification />
    </div>
  );
}

export default App;
