/*
Data structure to store information about a building
*/

export class Building {
  name;
  acronym;
  faculty; // array of faculty categories
  numFloors;
  builtYear;
  servesFood; // T/F
  connectsTo; // Array of buildings it connects to via bridges/tunnels
  blurb;
}
