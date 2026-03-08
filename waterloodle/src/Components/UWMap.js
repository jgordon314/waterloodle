import { polygons } from "./betterPolygons.js";

const duplicates = {
  EV3: ["EV2", "EV1"],
  STC: ["B2", "B1"],
  SLC: ["PAC"],
  EXP: ["LHI", "BMH"],
  E2: ["E3"],
  E3: ["E2"],
};

export default function UWMap({ guessed, distances }) {
  // console.log(distances);
  return (
    <div className="UWMap">
      <svg viewBox={`0, 0, 2400, 4000`}>
        <image href="/bettermap.png"></image>
        {polygons.map(({ id, points }) => {
          // If guessed, use fillColors[id], else transparent
          const fill = guessed.find(
            (g) => g.acronym === id || duplicates[id]?.includes(g.acronym),
          )
            ? distances.get(id) == -1
              ? "red"
              : `oklch(0.7 ${0.1669 + (distances.get(id) ?? 0) / 100} 95.65)`
            : "transparent"; //TODO: vary shades of yellow by distance

          return (
            <polygon
              key={id}
              id={id}
              points={points}
              fill={fill}
              stroke="black"
              strokeWidth={1}
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("clicked region: " + id);
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
