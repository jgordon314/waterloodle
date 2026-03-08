import './instructions.css';

function InstructionPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <h2>How to Play</h2>
        
        <div className="instructions">
          <ul>
            <li>Enter a guess for the secret UW building on main campus</li>
            <li>You will learn information about the accuracy of each of your guesses</li>
            <li>You can view the campus map to see where your building guess is</li>
            <li>Red buildings can not reach the secret building via tunnel/bridge</li>
            <li>Yellow buildings can reach the secret building via tunnel/bridge</li>
            <li>If you guess the correct building within 8 tries, you win!</li>
          </ul>
          
          <p className="tip">
            Good luck!
          </p>
        </div>

        <button className="got-it-button" onClick={onClose}>
          Got It!
        </button>
      </div>
    </div>
  );
}

export default InstructionPopup;