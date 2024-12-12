"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CampusSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    polygon: {
        type: {
            type: String,
            enum: ["Polygon", "MultiPolygon"],
            required: true,
        },
        coordinates: {
            type: mongoose_1.Schema.Types.Mixed,
            required: true,
        },
    },
    alt_name: String,
    amenity: String,
    name_ml: String,
    type: String,
    website: String,
    wikidata: String,
    wikipedia: String,
    addr: {
        city: String,
        street: String,
        housenumber: String,
        postcode: String,
    },
    contact: {
        email: String,
        facebook: String,
        website: String,
    },
    operator: String,
    operator_type: String,
    internet_access: String,
    building: String,
    building_levels: Number,
    wheelchair: String,
    relations: [
        {
            role: String,
            rel: Number,
            reltags: {
                amenity: String,
                name: String,
                type: String,
            },
        },
    ],
});
// Pre-save hook to convert `reltags` to a string
// CampusSchema.pre("save", function (next) {
//    if (this.relations) {
//       this.relations = this.relations.map(relation => ({
//          ...relation,
//          reltags: JSON.stringify(relation.reltags)  // Convert object to string
//       }));
//    }
//    next();
// });
CampusSchema.index({ polygon: "2dsphere" });
exports.default = (0, mongoose_1.model)("Campus", CampusSchema);
//# sourceMappingURL=Campus.js.map