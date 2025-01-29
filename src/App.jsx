import './App.css';
import Chat from './components/chat/chat';
import List from './components/list/List';
function App() {
  return (
    <div className="container">
      <List />
      <Chat />
    </div>
  );
}

export default App;
