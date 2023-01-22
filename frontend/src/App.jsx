import './App.css';
import io from 'socket.io-client';
import Game from "./components/game/Game";

const socket = io.connect(window.location);

function App() {
  return (
    <div>
      <Game socket={socket}></Game>
    </div>
  )
}

export default App;
