"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    geohash: {
        type: String,
    },
    polygon: {
        type: {
            type: String,
            enum: ["Polygon"],
        },
        coordinates: {
            type: [[[Number, Number]]],
        },
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
EventSchema.index({ polygon: "2dsphere" });
// export default model<IUser>("User", UserSchema);
exports.default = (0, mongoose_1.model)("Event", EventSchema);
//# sourceMappingURL=Event.js.map