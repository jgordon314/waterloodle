import { useState } from 'react';
import GameStartScreen from './components/start';
import MainScreen from './main';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [useDaily, setUseDaily] = useState(true);

  const onStartGame = (isDaily) => {
    setGameStarted(true);
    setUseDaily(isDaily);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <GameStartScreen onStartGame={onStartGame} />
      ) : (
        <MainScreen useDaily={useDaily} />
      )}
    </div>
  );
}

export default App;