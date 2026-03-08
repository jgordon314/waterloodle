import { useState } from "react";
import GameStartScreen from "./components/start.jsx"
import MainScreen from "./main";
import { BuildingGraph } from './Model/BuildingGraph';
import './App.css';

function App() {  
  const [gameStarted, setGameStarted] = useState(false);
  const [useDaily, setUseDaily] = useState(true);

  const onStartGame = (isDaily) => {
    setGameStarted(true);
    setUseDaily(isDaily);
  };

  return (
    <div className="app" style={{ height: "100vh" }}>
      {!gameStarted ? (
        <GameStartScreen onStartGame={onStartGame} />
      ) : (
        <MainScreen useDaily={useDaily} onRestart={() => {setGameStarted(false)}} />
      )}
    </div>
  );
}

export default App;
