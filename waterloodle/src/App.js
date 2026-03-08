import logo from './logo.svg';
import './App.css';
import UWMap from './Components/UWMap';
import { useState } from 'react';
import { BuildingGraph } from './Model/BuildingGraph';

function App() {
  const [graph, setGraph] = useState(new BuildingGraph([]));
  const [distances, setDistances] = useState(new Map());
  const [guesses, setGuesses] = useState([]);

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <UWMap guessed={guesses} distances={distances}></UWMap>
    </div>
  );
}

export default App;
