"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvents = exports.createEvent = void 0;
const Event_1 = __importDefault(require("../../models/Event"));
const geohash_1 = require("../../utils/geohash");
const User_1 = __importDefault(require("../../models/User"));
const testCoordinates = [
    [
        [76.148, 10.564],
        [76.149, 10.564],
        [76.149, 10.565],
        [76.148, 10.565],
        [76.148, 10.564],
    ],
];
const createEvent = async (req, res) => {
    try {
        const { created_by, polygon, coords } = req.body;
        const { latitude, longitude } = coords;
        const hash = await (0, geohash_1.geohashEncode)(coords[1], coords[0]);
        // Log the received coordinates for debugging
        console.log("Received polygon coordinates:", polygon.geometry.coordinates);
        const newEvent = new Event_1.default({
            geohash: hash,
            created_by: created_by,
            polygon: {
                type: "Polygon",
                coordinates: testCoordinates,
            },
        });
        const savedEvent = await newEvent.save();
        const neighbors = await (0, geohash_1.geohashNeighbors)(hash.toString());
        const nearbyUsers = await User_1.default.find({
            geohash: { $in: [hash, ...neighbors] },
        });
        // Send Notification
        console.log(nearbyUsers);
        res.json(savedEvent);
    }
    catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Failed to create event" });
    }
};
exports.createEvent = createEvent;
const getAllEvents = async (req, res) => {
    try {
        const allEvents = await Event_1.default.find();
        return res.status(200).json({ message: "College Found", events: allEvents });
    }
    catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Failed to get event" });
    }
};
exports.getAllEvents = getAllEvents;
//# sourceMappingURL=index.js.map