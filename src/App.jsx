import './App.css';
import Chat from './components/chat/chat';
import List from './components/list/List';
import Register from './components/register/register';
import { Notification } from './components/Notification';
function App() {
  const user = false
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
