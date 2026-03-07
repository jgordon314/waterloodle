// App.jsx
import { useState } from 'react';
import GameStartScreen from './components/start';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      {!gameStarted ? (
        <GameStartScreen onStartGame={() => setGameStarted(true)} />
      ) : (
        // <Game />
        <p>meow</p>
      )}
    </div>
  );
}

export default App;