import { useState } from 'react';
import { Group, Panel, PanelResizeHandle } from "react-resizable-panels";
import GuessRow from "./guessRow";
import buildingData from './data/buildings.json';

function seededRandomGenerator(seed) {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 0xFFFFFFFF; // Normalize to [0, 1)
}

function MainScreen({ useDaily }) {
    const now = new Date();
    let buildingNum = 0;
    const [guesses, setGuesses] = useState([]);
    if (useDaily) {
        // simplified seed – adjust as needed
        const seed = (now.getDate() + now.getMonth() * 31 + now.getFullYear() * 366 + 5) * 1000;
        buildingNum = Math.floor(seededRandomGenerator(seed) * buildingData.length);
    } else {
        buildingNum = Math.floor(Math.random() * buildingData.length);
    }
    
    const building = buildingData[buildingNum];

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const b of buildingData) {
            if (b.name.toLowerCase() === e.target[0].value.toLowerCase() || b.acronym.toLowerCase() === e.target[0].value.toLowerCase()) {
                if (!guesses.some(g => g.name === b.name)) {
                    setGuesses([b, ...guesses]);
                }
                break;
            }
        }
    };

    return (
        <Group
            direction="vertical" 
            style={{ height: '100vh', overflow: 'hidden' }}
        >
            <Panel defaultSize={65} minSize={30} >
                <div style={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    boxSizing: 'border-box',
                    borderRight: '1px solid #ddd',
                }}>
                    <h1>Guess</h1>
                    
                    <form onSubmit={handleSubmit} style={{ margin: '12px 0' }}>
                        <input 
                            type="text" 
                            placeholder="Enter building name..." 
                            style={{ padding: '8px', width: '280px' }}
                        />
                        <button type="submit" style={{ padding: '8px 16px', marginLeft: '8px' }}>
                            Submit
                        </button>
                    </form>
<table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            tableLayout: 'fixed',      // helps prevent horizontal overflow
                        }}>
                            <thead>
                                <tr>
                                    <th>Building</th>
                                    <th>Faculty</th>
                                    <th>Stories</th>
                                    <th>Year</th>
                                    <th>Food</th>
                                </tr>
                            </thead>
                        </table>
                    
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',     // only vertical scroll
                        overflowX: 'hidden',   // ← prevents horizontal scrollbar
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        marginTop: '8px',
                    }}>
                                {guesses.map((b) => (
                                    <GuessRow key={b.name} building={b} />
                                ))}
                    </div>
                </div>
            </Panel>


            <Panel defaultSize={35} minSize={20}>
                <div style={{ 
                    height: '100%',
                    padding: '16px',
                    boxSizing: 'border-box',
                }}>
                    <h1>Map for {building.name}</h1>
                    {/* Your map component / image / leaflet / etc goes here */}
                    <div style={{ 
                        height: 'calc(100% - 40px)', 
                        background: '#f0f0f0', 
                        marginTop: '12px',
                        overflow: 'hidden'
                    }}>
                        {/* Map content */}
                    </div>
                </div>
            </Panel>
        </Group>
    );
}

export default MainScreen;