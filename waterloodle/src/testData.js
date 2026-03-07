/*
export class Building {
  name;
  acronym;
  faculty; // faculty name, or NA
  numFloors;
  builtYear;
  servesFood; // T/F
  connectsTo; // Array of buildings it connects to via bridges/tunnels
  blurb;
}
*/

import {Building} from './Model/Building'

let buildingData = [
    new Building(
        "Science Teaching Center", 
        "STC",
        "Science" ,
        4,
        1970,
        true,
        [],
        "lorem ipsum"
    ),
    new Building(
        "Mathematics and Computing", 
        "MC",
        "Math" ,
        7,
        1950,
        true,
        [],
        "lorem ipsum"
    ),
    new Building(
        "Engineering 6", 
        "E6",
        "Engineering" ,
        5,
        2010,
        false,
        [],
        "lorem ipsum"
    ),
];

export default buildingData;