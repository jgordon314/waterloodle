/*
Data structure to store information about a building
*/

export class Building {
    name; // Building full name: (Ex: Pearl Sullivan Engineering (Formerly E7))
    abbr; // Building short form: (Ex: PSE)
    faculty; // faculty name, or NA
    numFloors;
    builtYear;
    servesFood; // T/F
    connectsTo; // Array of abbriviations for buildings it connects to via bridges/tunnels
    blurb;
}