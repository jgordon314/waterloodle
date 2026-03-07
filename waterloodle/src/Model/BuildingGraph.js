/*
    Stores the graph of connected/unconnected buildings as an adjacency list
*/

export class BuildingGraph{
    buildings; // dictionary of building objects, with acronyms as keys

    constructor(){
        this.buildings = new Map();
    }

    constructor(buildings){ //initializes the graph from an array of Building objects
        this.buildings = new Map();

        for (let b of buildings){
            this.addBuilding(b);
        }
    }

    /*
        Takes two Building acronyms
        and returns the minimum number of bridges that must be traversed between the buildings.
        If the buildings are not connected, returns -1.
        Throws an exception if either building is not present in buildings
    */
    bridgeDistance(start, finish){
        // BFS the graph starting at "start"//
        visited = new Map();
        for (const [key, value] of this.buildings.entries()){
            visited.set(key, false);
        }
        root = start;
        q = new Array(); // queue of nodes to visit next
        q.push(root);

        depth = 1;
        while (q.size != 0){
            cur = q[0];
            q = q.splice(0, 1); 

            visited.set(cur, true);
            for (let conn of cur.connectsTo){
                if (conn == finish){
                    // We've travelled from the start to finish, so they are connected and depth gives the number of bridges travelled to get here
                    return depth;
                }
                if (!visited.get(conn)){
                    q.push(conn);
                }
            }
            depth++;
        }

        //If we get here, we didn't reach finish :(
        return -1
    }

    isConnected(start, finish){
        return this.bridgeDistance(start, finish) != -1;
    }

    addBuilding(building){
        this.buildings.set(building.acronym, building);
    }

    getBuildingByacronym(acronym){
        return this.buildings.get(acronym);
    }
}