"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotification = void 0;
const mongoose_1 = require("mongoose");
const userNotificationSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: Number, required: true },
    data: { type: mongoose_1.Schema.Types.Mixed },
    is_read: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.UserNotification = (0, mongoose_1.model)("UserNotification", userNotificationSchema);
//# sourceMappingURL=UserNotification.js.map