// src/components/GameStartScreen.jsx
import { useState } from 'react';
import './start.css';
import InstructionPopup from './instructions.jsx'

function GameStartScreen({ onStartGame }) {
  const [isStarting, setIsStarting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    // Small delay so the animation can be seen
    setTimeout(() => {
      onStartGame();
    }, 500);
  };

  return (
    <div className="start-screen">
      <div className="content">
        <h1 className="title">WATERLOODLE</h1>

        <div className="menu">
          <button
            className={`start-button`}
            onClick={handleStart}
            disabled={isStarting}
          >
            Play Daily
          </button>

          <button
            className={`start-button`}
            onClick={handleStart}
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