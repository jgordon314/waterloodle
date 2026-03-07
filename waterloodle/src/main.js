import { useState } from "react";
import { Group, Panel, PanelResizeHandle } from "react-resizable-panels";
import GuessRow from "./guessRow";

import buildingData from "./testData";

function MainScreen() {

    

  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!guess.trim()) {
      setError("Please enter a guess.");
      return;
    }

    const match = buildingData.find(
      (b) => b.name.toLowerCase() === guess.trim().toLowerCase()
    );
    if (!match) {
      setError("No matching building found.");
      return;
    }

    setError("");
    // do something with match, e.g. add to guesses, update UI, etc.
  };

  return (
    <Group direction="horizontal">
      <Panel defaultSize={50}>
        <h1>Guess</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <Group direction="vertical">
          <Panel defaultSize={50}>
            {buildingData.map((building) => (
              <GuessRow key={building.name} building={building} />
            ))}
          </Panel>
        </Group>
      </Panel>

      <Panel defaultSize={50}>
        <h1>Map</h1>
      </Panel>
    </Group>
  );
}

export default MainScreen;