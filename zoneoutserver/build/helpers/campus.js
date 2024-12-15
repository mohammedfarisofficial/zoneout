"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCampusById = exports.findCampusByUserLocation = void 0;
const Campus_1 = __importDefault(require("../models/Campus"));
const findCampusByUserLocation = async (userLocation) => {
    try {
        const campus = await Campus_1.default.findOne({
            polygon: {
                $geoIntersects: {
                    $geometry: userLocation,
                },
            },
        });
        if (campus) {
            return campus;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error finding campus:", error);
    }
};
exports.findCampusByUserLocation = findCampusByUserLocation;
const findCampusById = async (campusId) => {
    try {
        const campus = await Campus_1.default.findById(campusId);
        if (!campus) {
            return false;
        }
        return campus;
    }
    catch (error) {
        console.error("Error findCampusById:", error);
        return false;
    }
};
exports.findCampusById = findCampusById;
//# sourceMappingURL=campus.js.map