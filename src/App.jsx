import './App.css';
import Chat from './components/chat/chat';
import List from './components/list/List';
import Register from './components/register/register';
import { Notification } from './components/Notification';
import { auth } from './backend/firebase';
import Loading from './components/loading/Loading';

function App() {
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
