"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionDetails = exports.userConnections = exports.rejectConnectionRequest = exports.acceptConnectionRequest = exports.sendConnectionRequest = void 0;
const User_1 = __importDefault(require("../../models/User"));
const notification_helper_1 = require("../../helpers/notification-helper");
const notification_1 = require("../../constants/notification");
const UserConnectionRequest_1 = require("../../models/UserConnectionRequest");
const UserConnection_1 = require("../../models/UserConnection");
const sendConnectionRequest = async (req, res) => {
    const { userId } = req.user;
    const { receiverId } = req.body;
    if (!userId || !receiverId) {
        return res.status(400).send({ error: "Sender and receiver IDs are required." });
    }
    if (userId === receiverId) {
        return res.status(400).send({ error: "You cannot send a connection request to yourself." });
    }
    try {
        const existingRequest = await UserConnectionRequest_1.UserConnectionRequest.findOne({
            sender: userId,
            receiver: receiverId,
        });
        if (existingRequest) {
            return res.status(400).send({ error: "Connection request already exists." });
        }
        const newRequest = await UserConnectionRequest_1.UserConnectionRequest.create({
            sender: userId,
            receiver: receiverId,
            status: UserConnectionRequest_1.ConnectionRequestStatus.PENDING,
        });
        // Send Push Notification
        // Send Notification
        const connectionNotification = {
            user: receiverId,
            type: notification_1.NOTIFICATION_TYPE_CONNECTION_REQUEST,
            data: {
                senderId: userId,
                requestId: newRequest._id,
                message: "You have a new friend request",
                status: UserConnectionRequest_1.ConnectionRequestStatus.PENDING,
            },
        };
        await (0, notification_helper_1.setConnectionNotification)(connectionNotification);
        res.status(200).send({
            message: "Connection request sent successfully.",
            request: newRequest,
        });
    }
    catch (error) {
        console.error("Error sending user connection request:", error);
        res.status(500).send({ error: "Failed to send connection request." });
    }
};
exports.sendConnectionRequest = sendConnectionRequest;
const acceptConnectionRequest = async (req, res) => {
    const { userId } = req.user;
    const { requestId, notificationId } = req.body;
    if (!userId || !requestId) {
        return res.status(400).send({ error: "Request ID and user ID are required." });
    }
    try {
        const request = await UserConnectionRequest_1.UserConnectionRequest.findOne({
            _id: requestId,
            receiver: userId,
            status: UserConnectionRequest_1.ConnectionRequestStatus.PENDING,
        });
        if (!request) {
            return res
                .status(404)
                .send({ error: "Connection request not found or already processed." });
        }
        request.status = UserConnectionRequest_1.ConnectionRequestStatus.ACCEPTED;
        await request.save();
        // Add connections for both users
        await UserConnection_1.UserConnection.updateOne({ user: userId }, { $addToSet: { connections: request.sender } }, { upsert: true } // Create the document if it doesn't exist
        );
        await UserConnection_1.UserConnection.updateOne({ user: request.sender }, { $addToSet: { connections: userId } }, { upsert: true });
        const updatedNotification = await (0, notification_helper_1.updateConnectionNotification)(notificationId, UserConnectionRequest_1.ConnectionRequestStatus.ACCEPTED);
        res.status(200).json({
            message: "Connection request accepted.",
            notification: updatedNotification,
        });
    }
    catch (error) {
        console.error("Error accepting user connection request:", error);
        res.status(500).send({ error: "Failed to accept connection request." });
    }
};
exports.acceptConnectionRequest = acceptConnectionRequest;
const rejectConnectionRequest = async (req, res) => {
    const { userId } = req.user;
    const { requestId, notificationId } = req.body;
    if (!userId || !requestId) {
        return res.status(400).send({ error: "Request ID and user ID are required." });
    }
    try {
        const request = await UserConnectionRequest_1.UserConnectionRequest.findOne({
            _id: requestId,
            receiver: userId,
            status: UserConnectionRequest_1.ConnectionRequestStatus.PENDING,
        });
        if (!request) {
            return res
                .status(404)
                .send({ error: "Connection request not found or already processed." });
        }
        request.status = UserConnectionRequest_1.ConnectionRequestStatus.REJECTED;
        await request.save();
        const updatedNotification = await (0, notification_helper_1.updateConnectionNotification)(notificationId, UserConnectionRequest_1.ConnectionRequestStatus.REJECTED);
        res.status(200).json({
            message: "Connection request rejected.",
            notification: updatedNotification,
        });
    }
    catch (error) {
        console.error("Error rejecting user connection request:", error);
        res.status(500).send({ error: "Failed to reject connection request." });
    }
};
exports.rejectConnectionRequest = rejectConnectionRequest;
const userConnections = async (req, res) => {
    const { userId } = req.user;
    try {
        const userConnections = await UserConnection_1.UserConnection.findOne({ user: userId }).populate("connections", "email location" // Include only necessary fields
        );
        if (!userConnections || userConnections.connections.length === 0) {
            return res.status(404).send({ error: "No connections found." });
        }
        res.status(200).send({ connections: userConnections.connections });
    }
    catch (error) {
        console.error("Error fetching user connections:", error);
        res.status(500).send({ error: "Failed to fetch user connections." });
    }
};
exports.userConnections = userConnections;
const getConnectionDetails = async (req, res) => {
    const { connectionId } = req.params;
    if (!connectionId) {
        return res.status(400).json({
            error: "Missing required parameter: connectionId",
        });
    }
    try {
        // Find the user details
        const connectionDetails = await User_1.default.findById(connectionId).select("_id email name location profilePicture");
        if (!connectionDetails) {
            return res.status(404).json({
                error: "Connection not found.",
            });
        }
        res.status(200).json({
            message: "Connection details retrieved successfully.",
            connection: connectionDetails,
        });
    }
    catch (error) {
        console.error("Error fetching connection details:", error);
        res.status(500).json({
            error: "Failed to fetch connection details.",
        });
    }
};
exports.getConnectionDetails = getConnectionDetails;
//# sourceMappingURL=index.js.map