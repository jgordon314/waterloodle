// src/components/GameStartScreen.jsx
import { useState } from 'react';
import './start.css';
import InstructionPopup from './instructions.jsx'

function GameStartScreen({ onStartGame }) {
  const [isStarting, setIsStarting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const handleStartDaily = () => {
    setIsStarting(true);
    setTimeout(() => {
      onStartGame(true);
    }, 100);
  };

  const handleStartRandom = () => {
    setIsStarting(true);
    setTimeout(() => {
      onStartGame(false);
    }, 100);
  };

  return (
    <div className="start-screen">
      <div className="content">
        <h1 className="title">WATERLOODLE</h1>

        <div className="menu">
          <button
            className={`start-button`}
            onClick={handleStartDaily}
            disabled={isStarting}
          >
            Play Daily
          </button>

          <button
            className={`start-button`}
            onClick={handleStartRandom}
            disabled={isStarting}
          >
            Play Random
          </button>

          <button className="secondary-button" onClick={() => setShowInstructions(true)}>
            How to Play
          </button>
          {/* <button className="secondary-button">High Scores</button> */}
        </div>
      </div>

      <InstructionPopup isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
    </div>
  );
}

export default GameStartScreen;