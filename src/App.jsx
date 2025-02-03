import './App.css';
import Chat from './components/chat/chat';
import List from './components/list/List';
import Register from './components/register/register';
import { Notification } from './components/Notification';
import Loading from './components/loading/Loading';
import userInfo from './backend/userInfo';

function App() {
  const{ user, IsLoading } = userInfo()

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
