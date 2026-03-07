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
            <li>Click buttons</li>
            <li>Enter text</li>
            <li>Thrive</li>
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