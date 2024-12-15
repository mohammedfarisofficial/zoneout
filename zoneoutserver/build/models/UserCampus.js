"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCampus = void 0;
const mongoose_1 = require("mongoose");
// Schema definition
const userCampusSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    campus: { type: mongoose_1.Schema.Types.ObjectId, ref: "Campus", required: true },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.UserCampus = (0, mongoose_1.model)("UserCampus", userCampusSchema);
//# sourceMappingURL=UserCampus.js.map