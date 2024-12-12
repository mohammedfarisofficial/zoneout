"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWSS = exports.initSocket = void 0;
const ws_1 = require("ws");
const crypto_1 = require("crypto");
const geohash_1 = require("../utils/geohash");
const User_1 = __importDefault(require("../models/User"));
const SOCKET_EVENTS = __importStar(require("../constants/socket-event"));
let wss;
const connections = {};
const initSocket = (server) => {
    wss = new ws_1.WebSocketServer({ server });
    wss.on("connection", (ws) => {
        const socket_id = (0, crypto_1.randomUUID)();
        ws.id = socket_id;
        connections[socket_id] = ws;
        console.log("A user connected", ws.id);
        ws.on("message", async (message) => {
            try {
                const data = JSON.parse(message.toString());
                const { event, payload } = data;
                if (event === SOCKET_EVENTS.USER_LOCATION) {
                    const { user_id, coords } = payload;
                    const { latitude, longitude } = coords;
                    console.log("User location update : ", user_id, coords);
                    // Generate geohash
                    const hash = await (0, geohash_1.geohashEncode)(latitude, longitude);
                    await User_1.default.findByIdAndUpdate(user_id, {
                        $set: { location: [longitude, latitude], geohash: hash, socket_id: ws.id },
                    });
                    const user = await User_1.default.findById(user_id).populate("connections");
                    if (!user.connections || user.connections.length === 0) {
                        console.log("No Connections!!");
                        return;
                    }
                    // Broadcast to connections
                    user.connections.forEach((connection) => {
                        if (!connection.socket_id) {
                            return;
                        }
                        const targetSocket = connections[connection === null || connection === void 0 ? void 0 : connection.socket_id];
                        if (targetSocket) {
                            targetSocket.send(JSON.stringify({
                                event: SOCKET_EVENTS.CONNECTION_LOCATION_UPDATE,
                                data: { user_id, latitude, longitude },
                            }));
                        }
                    });
                }
            }
            catch (error) {
                console.error("Error handling message:", error);
            }
        });
        // Handle disconnection
        ws.on("close", () => {
            console.log("User disconnected", ws.id);
            delete connections[ws.id];
        });
    });
    return wss;
};
exports.initSocket = initSocket;
const getWSS = () => {
    if (!wss) {
        throw new Error("WebSocket server not initialized!");
    }
    return wss;
};
exports.getWSS = getWSS;
//# sourceMappingURL=socket.js.map