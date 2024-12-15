"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnection = void 0;
const mongoose_1 = require("mongoose");
const userConnectionSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    connections: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.UserConnection = (0, mongoose_1.model)("UserConnection", userConnectionSchema);
//# sourceMappingURL=UserConnection.js.map