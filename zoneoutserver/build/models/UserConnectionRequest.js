"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionRequestStatus = exports.UserConnectionRequest = void 0;
const mongoose_1 = require("mongoose");
const STATUS_PENDING = 1;
const STATUS_ACCEPTED = 2;
const STATUS_REJECTED = 3;
const userConnectionRequestSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    status: {
        type: Number,
        enum: [STATUS_PENDING, STATUS_ACCEPTED, STATUS_REJECTED],
        default: STATUS_PENDING,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
userConnectionRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });
exports.UserConnectionRequest = (0, mongoose_1.model)("UserConnectionRequest", userConnectionRequestSchema);
exports.ConnectionRequestStatus = {
    PENDING: STATUS_PENDING,
    ACCEPTED: STATUS_ACCEPTED,
    REJECTED: STATUS_REJECTED,
};
//# sourceMappingURL=UserConnectionRequest.js.map