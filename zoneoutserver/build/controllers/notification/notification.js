"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = void 0;
const notification_helper_1 = require("../../helpers/notification-helper");
const getNotifications = async (req, res) => {
    const { userId } = req.user;
    try {
        const userNotifications = await (0, notification_helper_1.getUserNotifications)(userId);
        console.log("userNotifications", userNotifications);
        if (!userNotifications) {
            return res.status(400).json({ type: 1, message: "User notication is empty!" });
        }
        return res.status(200).json({ notifications: userNotifications });
    }
    catch (error) {
        console.log("getNotifications", Error);
    }
};
exports.getNotifications = getNotifications;
//# sourceMappingURL=notification.js.map