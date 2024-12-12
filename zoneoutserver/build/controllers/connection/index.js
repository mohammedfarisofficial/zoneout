"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionDetails = exports.userConnections = exports.acceptConnection = exports.connectionRequest = void 0;
const User_1 = __importDefault(require("../../models/User"));
const connectionRequest = async (req, res) => {
    const { userId } = req.user;
    const { receiverId } = req.body;
    if (!userId || !receiverId) {
        return res.status(400).send({ error: "Sender and receiver IDs are required." });
    }
    try {
        // Request already exists
        const sender = await User_1.default.findOne({ _id: userId, sent_requests: receiverId });
        const receiver = await User_1.default.findOne({ _id: receiverId, received_requests: userId });
        if (sender || receiver) {
            return res.status(400).send({ error: "Connection request already exists." });
        }
        // Add the connection request
        await User_1.default.updateOne({ _id: userId }, { $addToSet: { sent_requests: receiverId } });
        await User_1.default.updateOne({ _id: receiverId }, { $addToSet: { received_requests: userId } });
        res.status(200).send({ message: "Connection request sent successfully." });
    }
    catch (error) {
        console.error("Error sending connection request:", error);
        res.status(500).send({ error: "Failed to send connection request." });
    }
};
exports.connectionRequest = connectionRequest;
const acceptConnection = async (req, res) => {
    // const { userId } = req.user;
    const { receiverId, userId } = req.body;
    if (!userId || !receiverId) {
        return res.status(400).send({ error: "Both userId and receiverId are required." });
    }
    if (userId === receiverId) {
        return res
            .status(400)
            .send({ error: "You cannot accept a connection request from yourself." });
    }
    try {
        const sender = await User_1.default.findOne({ _id: userId, received_requests: receiverId });
        const receiver = await User_1.default.findOne({ _id: receiverId, sent_requests: userId });
        if (!sender || !receiver) {
            return res.status(404).send({ error: "Connection request not found." });
        }
        // Remove requests
        await User_1.default.updateOne({ _id: userId }, { $pull: { received_requests: receiverId } });
        await User_1.default.updateOne({ _id: receiverId }, { $pull: { sent_requests: userId } });
        // Add to connections
        await User_1.default.updateOne({ _id: userId }, { $addToSet: { connections: receiverId } });
        await User_1.default.updateOne({ _id: receiverId }, { $addToSet: { connections: userId } });
        res.status(200).send({ message: "Connection request accepted." });
    }
    catch (error) {
        console.error("Error accepting connection request:", error);
        res.status(500).send({ error: "Failed to accept connection request." });
    }
};
exports.acceptConnection = acceptConnection;
const userConnections = async (req, res) => {
    const { userId } = req.user;
    try {
        const user = await User_1.default.findById(userId).populate("connections", "email location");
        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }
        res.status(200).send({ connections: user.connections });
    }
    catch (error) {
        console.error("Error fetching connections:", error);
        res.status(500).send({ error: "Failed to fetch connections." });
    }
};
exports.userConnections = userConnections;
const getConnectionDetails = async (req, res) => {
    const { connectionId } = req.params;
    console.log("connectionId", connectionId);
    // Params checking
    if (!connectionId) {
        return res.status(400).json({
            // type: 1,
            error: "Missing required parameters",
        });
    }
    const connectionDetails = await User_1.default.findById(connectionId);
    if (!connectionDetails) {
        return res.status(404).json({
            // type: 1,
            error: "Connection not found!",
        });
    }
    const formattedConnection = connectionDetails.toObject();
    // Remove sensitive data
    delete formattedConnection.password;
    delete formattedConnection.otp_code;
    delete formattedConnection.otp_expiry;
    delete formattedConnection.dob;
    delete formattedConnection.signin_method;
    delete formattedConnection.account_progression;
    console.log("connectionDetails", formattedConnection);
    return res.status(200).json({
        message: "Connection details found!",
        connection: formattedConnection,
    });
};
exports.getConnectionDetails = getConnectionDetails;
//# sourceMappingURL=index.js.map