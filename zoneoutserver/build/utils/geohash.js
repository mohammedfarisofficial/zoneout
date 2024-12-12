"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geohashNeighbors = exports.geohashEncode = void 0;
// var Geohash = require('ngeohash');
const ngeohash_1 = __importDefault(require("ngeohash"));
const geohashEncode = async (latitude, longitude) => {
    // Change 6 character to 8 or 9 for only near peoples !!!!
    // default value is 9 
    // 6 characters: ~1.2 km × 0.61 km
    // 7 characters: ~152 m × 152 m
    // 8 characters: ~19 m × 19 m
    // 9 characters: ~4.8 m × 4.8 m
    const hash = ngeohash_1.default.encode(latitude, longitude, 6);
    return hash;
};
exports.geohashEncode = geohashEncode;
const geohashNeighbors = async (userhash) => {
    const neighbors = ngeohash_1.default.neighbors(userhash);
    //    console.log(neighbors);
    return neighbors;
};
exports.geohashNeighbors = geohashNeighbors;
//# sourceMappingURL=geohash.js.map