import { Group, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Building } from "./Model/Building";


export default function GuessRow({ building }) {
    const fields = [
        building.name + " (" + building.acronym + ")",
        building.faculty,
        building.numFloors,
        building.builtYear,
        building.servesFood ? "Yes" : "No"
    ];

    return (
        <div style={rowStyle}>
            {fields.map((value, index) => (
                <div key={index} style={cellStyle}>
                    <div style={cellContentStyle}>{value}</div>
                </div>
            ))}
        </div>
    );
}

const rowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "0px",
    width: "99%",
    margin: "1px",
    alignItems: "center",
};

const cellContentStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0rem",
    textAlign: "center",
    overflow: "hidden",
    wordBreak: "break-word",
};

const cellStyle = {
    position: "relative",
    border: "1px solid black",
    padding: "0",
    textAlign: "center",
    backgroundColor: "#eee",
    paddingTop: "100%", // Force square cells
    width: "100%",
};