"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCampus = void 0;
const Campus_1 = __importDefault(require("../models/Campus"));
const findCampus = async (userLocation) => {
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
exports.findCampus = findCampus;
//# sourceMappingURL=campus.js.map