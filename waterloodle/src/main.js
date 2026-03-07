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
    if (useDaily) {
        buildingNum = Math.floor(seededRandomGenerator((now.getDate()+5) * 900001 + now.getMonth() * 900001 + 900001*now.getFullYear()) * buildingData.length);
    } else {
        buildingNum = Math.floor(Math.random() * buildingData.length);
    }
    
    const building = buildingData[buildingNum];

    const handleSubmit = (event) => {}
    return (
        <Group direction="horizontal">
            <Panel defaultSize={50}>
                <h1>Guess</h1>

                <form onSubmit={handleSubmit}>
                    <input></input>
                    <button type="submit">Submit</button>
                </form>
                <Group direction="vertical">

                    <Panel defaultSize={50 }>
                        {buildingData.map((building) => (
                            <GuessRow key={building.name} building={building} />
                        ))}
                    </Panel>


                </Group>
            </Panel>

            <Panel defaultSize={50}>
                <h1>Map for {building.name}</h1>
            </Panel>
        </Group>
    );
}

export default MainScreen;