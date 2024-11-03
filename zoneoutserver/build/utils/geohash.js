import Geohash from 'latlon-geohash';
export const geohashEncode = async (latitude, longitude) => {
    // const Geohash = (await import('latlon-geohash')).default;
    const hash = Geohash.encode(latitude, longitude);
    return hash;
};
export const geoHashNeighbours = async (userhash) => {
    // const Geohash = (await import('latlon-geohash')).default;
    const neighbors = Geohash.neighbours(userhash);
    console.log(neighbors);
    return neighbors;
};
//# sourceMappingURL=geohash.js.map