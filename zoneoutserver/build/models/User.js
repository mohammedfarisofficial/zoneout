"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profile_picture: { type: String },
    socket_id: { type: String },
    geohash: { type: String },
    signin_method: { type: Number, default: 0 },
    account_progression: { type: Number },
    role: { type: Number, default: 0 },
    otp_code: { type: String, required: false },
    otp_expiry: { type: Date, required: false },
    fcm_token: [{ type: String }],
    dob: { type: Date },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
        },
    },
    // Connections
    connections: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserConnection" },
    // Campus
    campus: { type: mongoose_1.Schema.Types.ObjectId, ref: "Campus" },
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
UserSchema.index({ location: "2dsphere" });
// Define Methods
UserSchema.methods.createAccessToken = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
UserSchema.methods.createRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=User.js.map