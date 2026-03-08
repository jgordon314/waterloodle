import { ReactComponent as Mapdata} from './polygons.js'
import { polygons } from './polygons.js';

export default function UWMap({ guessed, distances}){ 
    // console.log(distances);
    return (
        <div className="UWMap">
            <svg viewBox="0, 0, 1800,  1000" >
            <image href="/uwmap.png"></image>
            {polygons.map(({ id, points }) => {
                // If guessed, use fillColors[id], else transparent
                const fill = guessed.includes(id) ? (distances.get(id) == -1? "red": `oklch(0.7 ${0.1669 + (distances.get(id) ?? 0) / 100} 95.65)`): "transparent"; //TODO: vary shades of yellow by distance

                return (
                <polygon
                    key={id}
                    id={id}
                    points={points}
                    fill={fill}
                    stroke="black"
                    strokeWidth={1}
                    style={{ cursor: "pointer" }}
                    onClick={() => {console.log("clicked region: " + id); guessed.push(id)}}    
                />
                );
            })}
            </svg>
        </div>
    )
}