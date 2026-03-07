import { Group, Panel, PanelResizeHandle } from "react-resizable-panels";
import GuessRow from "./guessRow";

import buildingData from "./testData";

function MainScreen() {

    const handleSubmit = (event) => {
        if(guess.trim().toUpperCase()) {
            
        }
    }
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
                <h1>Map</h1>
            </Panel>
        </Group>
    );
}

export default MainScreen;