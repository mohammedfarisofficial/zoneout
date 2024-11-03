// var Geohash = require('ngeohash');
import Geohash from "ngeohash";

export const geohashEncode = async (latitude: number, longitude: number) => {
   // Change 6 character to 8 or 9 for only near peoples !!!!
   // default value is 9 
   // 6 characters: ~1.2 km × 0.61 km
   // 7 characters: ~152 m × 152 m
   // 8 characters: ~19 m × 19 m
   // 9 characters: ~4.8 m × 4.8 m

   const hash = Geohash.encode(latitude, longitude, 6);
   return hash;
};

export const geohashNeighbors = async (userhash: string) => {
   const neighbors = Geohash.neighbors(userhash);
   //    console.log(neighbors);
   return neighbors;
};
