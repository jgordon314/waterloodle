import { useState, useEffect } from "react";
import { Group, Panel } from "react-resizable-panels";
import GuessRow from "./guessRow.js";
import buildingData from "./data/buildings.json";
import WinModal from "./components/winModal.jsx";
import UWMap from "./components/UWMap.js";
import {SearchBar} from "./SearchBar.jsx";

function seededRandomGenerator(seed) {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 0xffffffff;
}

function MainScreen({ useDaily, onRestart }) {
  const now = new Date();
  const [buildingNum, setBuildingNum] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [isWin, setWin] = useState(false);
  const maxGuesses = 8;

  useEffect(() => {
    if (useDaily) {
      const seed =
        (now.getDate() + now.getMonth() * 31 + now.getFullYear() * 366 + 5) *
        1000;
      setBuildingNum(
        Math.floor(seededRandomGenerator(seed) * buildingData.length),
      );
    } else {
      setBuildingNum(Math.floor(Math.random() * buildingData.length));
    }
  }, [useDaily]);

  const building = buildingData[buildingNum];

  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[0];
      if (
        lastGuess.name.toLowerCase() === building.name.toLowerCase() ||
        lastGuess.acronym.toLowerCase() === building.acronym.toLowerCase()
      ) {
        setWin(true);
        setShowEndScreen(true);
      } else if (maxGuesses - guesses.length <= 1) {
        setWin(false);
        setShowEndScreen(true);
      }
    }
  }, [guesses, building]);

  const handleGiveUp = (e) => {
    setWin(false);
    setShowEndScreen(true);
  };

  const handleSubmit = (guessedBuilding) => {
    if (!guessedBuilding) {
      return;
    }

    if (guesses.some((guess) => guess.objectId === guessedBuilding.objectId)) {
      return;
    }

    setGuesses((currentGuesses) => [guessedBuilding, ...currentGuesses]);
  };

  return (
    <Group
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      <Panel defaultSize={35} minSize={15}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            boxSizing: "border-box",
            backgroundColor: "#0a0a0a",
            color: "#ffd700",
            borderRight: "1px solid #333",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0px",
            }}
          >
            <h1
              style={{
                color: "#ffd700",
                margin: "0 0 16px 0",
                fontSize: "5vh",
                textShadow: "0 0 8px rgba(255, 215, 0, 0.4)",
              }}
            >
              Waterloodle
            </h1>
            <div style={{ flex: 1 }}></div>
            <p
              style={{
                color: "#ffd700",
                fontSize: "2vh",
                margin: "0 0 16px 0",
                textShadow: "0 0 8px rgba(255, 215, 0, 0.4)",
              }}
            >
              Remaining Guesses: {maxGuesses - guesses.length}
            </p>
          </div>

          <SearchBar
            handleSubmit={handleSubmit}
            handleGiveUp={handleGiveUp}
            buildings={buildingData}
            guesses={guesses}
          ></SearchBar>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              backgroundColor: "#111",
              color: "#ffd700",
              marginBottom: "8px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#1a1a1a",
                  fontSize: "2vh",
                  borderBottom: "2px solid #444",
                }}
              >
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Building
                </th>
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Faculty
                </th>
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Stories
                </th>
                <th style={{ padding: "10px", textAlign: "center" }}>Year</th>
                <th style={{ padding: "10px", textAlign: "center" }}>Food</th>
              </tr>
            </thead>
          </table>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              border: "1px solid #444",
              borderRadius: "6px",
              backgroundColor: "#0d0d0d",
              padding: "4px",
            }}
          >
            {guesses.map((b) => (
              <GuessRow key={b.name} building={b} target={building} />
            ))}
          </div>
        </div>
      </Panel>

      <Panel defaultSize={65} minSize={20}>
        <div
          style={{
            height: "100%",
            padding: "16px",
            boxSizing: "border-box",
            backgroundColor: "#000000",
            color: "#ffd700",
          }}
        >
          <h1
            style={{
              margin: "0 0 16px 0",
              color: "#ffd700",
              textShadow: "0 0 8px rgba(255, 215, 0, 0.3)",
            }}
          >
            Map for {building.name}
          </h1>
          {/* Your map component / image / leaflet / etc goes here – unchanged */}
          <div
            style={{
              height: "calc(100% - 40px)",
              background: "#111",
              marginTop: "12px",
              overflow: "hidden",
              border: "1px solid #333",
              borderRadius: "6px",
            }}
          >
            <UWMap guessed={guesses} distances={new Map()}></UWMap>
          </div>
        </div>
      </Panel>
      <WinModal
        isOpen={showEndScreen}
        onClose={onRestart}
        isWin={isWin}
        history={guesses}
        target={building}
      />
    </Group>
  );
}

export default MainScreen;
