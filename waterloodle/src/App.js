import { useState } from "react";
import GameStartScreen from "./components/start";
import MainScreen from "./main";
import UWMap from './Components/UWMap';
import { BuildingGraph } from './Model/BuildingGraph';
import logo from './logo.svg';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [useDaily, setUseDaily] = useState(true);

  const onStartGame = (isDaily) => {
    setGameStarted(true);
    setUseDaily(isDaily);
  };

  const [graph, setGraph] = useState(new BuildingGraph([]));
  const [distances, setDistances] = useState(new Map());
  const [guesses, setGuesses] = useState([]);

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
