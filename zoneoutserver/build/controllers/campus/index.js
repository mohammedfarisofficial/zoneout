"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOneCampus = exports.loadCampus = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Campus_1 = __importDefault(require("../../models/Campus"));
const loadCampus = async (req, res) => {
    try {
        const data = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../data/colleges-data.json"), "utf-8");
        const jsonData = JSON.parse(data);
        const features = jsonData.features;
        const errorCampuses = [];
        for (const feature of features) {
            const { properties, geometry } = feature;
            // Normalize type to proper casing
            const geometryType = geometry.type.charAt(0).toUpperCase() + geometry.type.slice(1).toLowerCase();
            if (geometryType === "Polygon" || geometryType === "MultiPolygon") {
                const campusData = {
                    name: properties.name || "Unnamed Campus",
                    polygon: {
                        type: geometryType,
                        coordinates: geometry.coordinates,
                    },
                    alt_name: properties.alt_name,
                    amenity: properties.amenity,
                    name_ml: properties["name_ml"] || properties["name:ml"], // Support both keys
                    type: properties.type,
                    website: properties.website,
                    wikidata: properties.wikidata,
                    wikipedia: properties.wikipedia,
                    addr: {
                        city: properties["addr:city"],
                        street: properties["addr:street"],
                        housenumber: properties["addr:housenumber"],
                        postcode: properties["addr:postcode"],
                    },
                    contact: {
                        email: properties["contact:email"],
                        facebook: properties["contact:facebook"],
                        website: properties["contact:website"],
                    },
                    operator: properties.operator,
                    operator_type: properties["operator:type"],
                    internet_access: properties.internet_access,
                    building: properties.building,
                    building_levels: properties["building:levels"]
                        ? parseInt(properties["building:levels"])
                        : undefined,
                    wheelchair: properties.wheelchair,
                    relations: properties["@relations"] || [],
                };
                try {
                    const newCampus = new Campus_1.default(campusData);
                    await newCampus.save();
                    console.log(`Campus ${campusData.name} saved successfully.`);
                }
                catch (saveError) {
                    console.error(`Error saving campus ${campusData.name}:`, saveError);
                    errorCampuses.push(campusData.name);
                }
            }
            else {
                console.error("Invalid geometry type, must be Polygon or MultiPolygon.");
                errorCampuses.push(properties.name || "Unnamed Campus");
            }
        }
        res.status(200).json({
            message: "Campuses processed.",
            errors: errorCampuses,
        });
    }
    catch (error) {
        console.error("Error uploading campus data:", error);
        res.status(500).json({ error: "Failed to upload campus data." });
    }
};
exports.loadCampus = loadCampus;
const loadOneCampus = async (req, res) => {
    try {
        const { type, properties, geometry } = req.body;
        // Basic validation
        if (type !== "Feature" || !properties || !geometry) {
            return res.status(400).json({ error: "Invalid GeoJSON data structure" });
        }
        // Normalize type to proper casing
        const geometryType = geometry.type.charAt(0).toUpperCase() + geometry.type.slice(1).toLowerCase();
        // Create a new campus document
        // const newCampus = new Campus({
        //     type,
        //     geometry,
        //     name: properties.name
        // });
        if (geometryType === "Polygon" || geometryType === "MultiPolygon") {
            const campusData = {
                name: properties.name || "Unnamed Campus",
                polygon: {
                    type: geometryType,
                    coordinates: geometry.coordinates,
                },
                alt_name: properties.alt_name,
                amenity: properties.amenity,
                name_ml: properties["name_ml"] || properties["name:ml"], // Support both keys
                type: properties.type,
                website: properties.website,
                wikidata: properties.wikidata,
                wikipedia: properties.wikipedia,
                addr: {
                    city: properties["addr:city"],
                    street: properties["addr:street"],
                    housenumber: properties["addr:housenumber"],
                    postcode: properties["addr:postcode"],
                },
                contact: {
                    email: properties["contact:email"],
                    facebook: properties["contact:facebook"],
                    website: properties["contact:website"],
                },
                operator: properties.operator,
                operator_type: properties["operator:type"],
                internet_access: properties.internet_access,
                building: properties.building,
                building_levels: properties["building:levels"]
                    ? parseInt(properties["building:levels"])
                    : undefined,
                wheelchair: properties.wheelchair,
                relations: properties["@relations"] || [],
            };
            try {
                const newCampus = new Campus_1.default(campusData);
                await newCampus.save();
                return res
                    .status(201)
                    .json({
                    success: true,
                    message: "Campus data uploaded successfully",
                    data: newCampus,
                });
            }
            catch (saveError) {
                console.error(`Error saving campus ${campusData.name}:`, saveError);
            }
        }
        else {
            console.error("Invalid geometry type, must be Polygon or MultiPolygon.");
        }
    }
    catch (error) {
        console.error("Error uploading campus data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.loadOneCampus = loadOneCampus;
//# sourceMappingURL=index.js.map