/*
    Stores the graph of connected/unconnected buildings as an adjacency list
*/

export class BuildingGraph{
    buildings; // dictionary of building objects, with acronyms as keys

    constructor(buildings){ //initializes the graph from an array of Building objects
        this.buildings = new Map();

        for (let b of buildings){
            this.addBuilding(b);
        }
    }

    // Takes the acronym for the "root" building, and returns a Map where each building acronym is the key and the minimum number of bridges between them
    // and the root is the value. If a building B is not connected to the root, the value at B will be -1.
    getDistances(root){
        console.log("getting Distances for root: " + root);
        if (!this.buildings.has(root)){
            throw new Error (`There is no building with the name ${root} in the graph!`);
        }

        // BFS the graph starting at the specified root //
        let distances = new Map();
        let visited = new Map();
        for (const [key, value] of this.buildings.entries()){
            visited.set(key, false);
            distances.set(key, -1);
        }
        let q = new Array(); // queue of nodes to visit next
        q.push(root);
        distances.set(root, 0);

        var depth = 1;
        while (q.length != 0 && depth < 10){
            if (!this.buildings.has(q[0])) throw Error("No building with acronym: " + q[0]);
            var cur = this.buildings.get(q[0]);
            q.splice(0, 1); 
            visited.set(cur.acronym, true);
            distances.set(cur.acronym, depth);

            for (var conn of cur.connectsTo){
                if (!visited.get(conn)){
                    q.push(conn);
                }
            }
            depth++;
        }

        return distances;
    }

    isConnected(start, finish){
        return this.bridgeDistance(start, finish) != -1;
    }

    addBuilding(building){
        this.buildings.set(building.acronym, building);
    }

    getBuildingByAcronym(acronym){
        return this.buildings.get(acronym);
    }
}