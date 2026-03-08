/*
Data structure to store information about a building
*/

export class Building {
    constructor(name, acronym, faculty, numFloors, builtYear, servesFood, connectsTo, blurb) {
    this.name = name;
    this.acronym = acronym;
    this.faculty = faculty;
    this.numFloors = numFloors;
    this.builtYear = builtYear;
    this.servesFood = servesFood;
    this.connectsTo = connectsTo;
    this.blurb = blurb;
    }
  name;
  acronym;
  objectId; // ArcGIS ObjectId when available
  faculty; // array of faculty categories
  numFloors;
  builtYear;
  servesFood; // T/F
  connectsTo; // Array of buildings it connects to via bridges/tunnels
  blurb;
}
