<!-- Testing site -->
https://geojson.io/#map=16.73/10.830086/76.023845
<!-- API provider -->
https://overpass-turbo.eu/index.html
<!-- prompt -->
[out:json][timeout:25];
// Define Kerala's area (using the OSM area identifier for Kerala)
area[name="Kerala"]->.searchArea;

// Search for universities and colleges within Kerala
(
  way["amenity"="university"](area.searchArea);
  relation["amenity"="university"](area.searchArea);
  way["amenity"="college"](area.searchArea);
  relation["amenity"="college"](area.searchArea);
);

// Output the results as GeoJSON geometry
out geom;
