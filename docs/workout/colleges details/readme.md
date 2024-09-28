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


<!-- For college formating  -->
two properties college.addr:city and collge.city

{
  name : college.name || Give default name or generate with data
  city : college.addr:city || collge.city || ""
  street: college.addr:street || ""
  osm_id: college.@id || ""
  post_code : college.addr:postcode || ""
  operator_type: college.operator:type || college.operator || ""
  state: "kerala",
  website: college.website ||
  phone: college.phone || 
}

