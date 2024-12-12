"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// export enum Gender {
//   male = 'male',
//   female = 'female',
//   undisclosed = 'undisclosed'
// }
const UserSchema = new mongoose_1.Schema({
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    polygon: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
        },
        required: true,
    },
});
UserSchema.index({ location: "2dsphere" });
// export default model<IUser>("User", UserSchema);
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=Location.js.map