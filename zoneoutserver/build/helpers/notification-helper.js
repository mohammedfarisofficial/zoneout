"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotifications = exports.updateConnectionNotification = exports.setConnectionNotification = void 0;
const UserNotification_1 = require("../models/UserNotification");
const setConnectionNotification = async ({ user, type, data, }) => {
    try {
        const notification = new UserNotification_1.UserNotification({
            user,
            type,
            data,
        });
        await notification.save();
    }
    catch (error) {
        console.log("Error : In Connection Notification", error.message);
    }
};
exports.setConnectionNotification = setConnectionNotification;
const updateConnectionNotification = async (notificationId, status) => {
    try {
        const updatedNotification = await UserNotification_1.UserNotification.findByIdAndUpdate(notificationId, { $set: { "data.status": status } }, { new: true });
        return updatedNotification;
    }
    catch (error) {
        console.log("Error: In updateConnectionNotification", error.message);
        return false;
    }
};
exports.updateConnectionNotification = updateConnectionNotification;
const getUserNotifications = async (userId) => {
    try {
        const notifications = await UserNotification_1.UserNotification.find({ user: userId })
            .sort({ updated_at: -1 })
            .exec();
        if (!notifications || !notifications.length) {
            return false;
        }
        return notifications;
    }
    catch (error) {
        console.log("Error : In getUserNotification", error.message);
        return false;
    }
};
exports.getUserNotifications = getUserNotifications;
//# sourceMappingURL=notification-helper.js.map