import "./instructions.css";

function InstructionPopup({ isOpen, onClose, isWin, history, target }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <h2>{isWin ? "You Won!" : "You Lost..."}</h2>

        <div className="instructions">The answer is: {target}</div>
        <div className="instructions">Number of guesses: {history.length}</div>

        <button className="got-it-button" onClick={onClose}>
          Home
        </button>
      </div>
    </div>
  );
}

export default InstructionPopup;
