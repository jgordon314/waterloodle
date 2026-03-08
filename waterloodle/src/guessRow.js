import { Group, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Building } from "./Model/Building";

export default function GuessRow({ building, target }) {
  // 0 = red, 1 = green, 2 = yellow
  let fields = [
    {
      value: building.name + " (" + building.acronym + ")",
      isCorrect: building.name === target.name ? 1 : 0,
    },
    { value: building.faculty.join(", "), isCorrect: 1 },
    {
      value:
        building.numFloors +
        (building.numFloors > target.numFloors
          ? " ↓"
          : building.numFloors < target.numFloors
            ? " ↑"
            : ""),
      isCorrect: building.numFloors === target.numFloors ? 1 : 0,
    },
    {
      value:
        building.builtYear +
        (building.builtYear > target.builtYear
          ? " ↓"
          : building.builtYear < target.builtYear
            ? " ↑"
            : ""),
      isCorrect: building.builtYear === target.builtYear ? 1 : 0,
    },
    {
      value: building.servesFood ? "Yes" : "No",
      isCorrect: building.servesFood === target.servesFood ? 1 : 0,
    },
  ];

  // set the faculty colours
  const buildingFacSet = new Set(building.faculty);
  const targetFacSet = new Set(target.faculty);
  if (
    buildingFacSet.size === targetFacSet.size &&
    [...buildingFacSet].every((f) => targetFacSet.has(f))
  ) {
    fields[1].isCorrect = 1;
  } else if ([...buildingFacSet].some((f) => targetFacSet.has(f))) {
    fields[1].isCorrect = 2;
  } else {
    fields[1].isCorrect = 0;
  }

  return (
    <div style={rowStyle}>
      {fields.map((field, index) => (
        <div key={index} style={cellStyle(field)}>
          <div style={cellContentStyle}>{field.value}</div>
        </div>
      ))}
    </div>
  );
}

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "0px",
  width: "100%",
  margin: "2px 0",
  alignItems: "center",
  backgroundColor: "#111", // dark background per row
  borderRadius: "4px",
  overflow: "hidden",
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
  padding: "0 8px",
  textAlign: "center",
  overflow: "hidden",
  wordBreak: "break-word",
  color: "#ffd700", // gold text
  fontWeight: "500",
  fontSize: "12px",
};

const cellStyle = (index, value) => ({
  position: "relative",
  border: "1px solid #444", // subtle dark border
  padding: "0",
  textAlign: "center",
  backgroundColor: getCellBackground(index, value), // dynamic bg
  paddingTop: "100%", // keep square aspect
  width: "100%",
  boxSizing: "border-box",
});

function getCellBackground(value) {
  if (value.isCorrect === 0) {
    return "#4a1a1a";
  }
  if (value.isCorrect === 1) {
    return "#2e4a1a";
  }
  return "#4a4a1a";
}
