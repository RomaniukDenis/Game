import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:5000");
function App() {

  const[message, setMessage] = useState('');
  const[allMessages, setAllMessages] = useState([]);
  const[room, setRoom] = useState('');

  const addMessage = () => {
    socket.emit('send_message', message);
    setMessage('');
  }
  
  const onMessageChange = (e) => {
    setMessage(e.target.value);
  } 

  useEffect(() => {
    socket.on("receive_message", (allMessages)=>{
      setAllMessages(allMessages.reverse());
    })
  }, [socket])

  return (
    <div>
      <div>
        <input type="text" placeholder='room' onChange={(e)=>setRoom(e.target.value)}/>
        <button onClick={() => {socket.emit("join_room", room)}}>Join</button>
      </div>
      <input type="text" placeholder='message...' value={message} onChange={onMessageChange}/>
      <button onClick={addMessage}>Send</button>
      { allMessages.map(msg => <p key={msg}>{msg}</p>) }
    </div>
  );
}

export default App;
