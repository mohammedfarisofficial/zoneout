"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.generateRefreshTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const access_levels_1 = require("../constants/access-levels");
const generateRefreshTokens = async (token, refresh_secret, refresh_expiry, access_secret, access_expiry) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, refresh_secret);
        const user = await User_1.default.findById(payload.userId);
        if (!user) {
            console.log("User not found!");
            // res.status(401).json({ message: "Invalid or expired token" });
        }
        const accessToken = await jsonwebtoken_1.default.sign({ userId: user.id }, access_secret, {
            expiresIn: access_expiry,
        });
        const newRefreshToken = await jsonwebtoken_1.default.sign({ userId: user.id }, refresh_secret, {
            expiresIn: refresh_expiry,
        });
        return { accessToken, newRefreshToken };
    }
    catch (error) {
        console.error(error);
        console.log("Invalid or expired token");
        // throw new UnauthenticatedError("Invalid or expired token");
    }
};
exports.generateRefreshTokens = generateRefreshTokens;
// User Access
const findUser = async (userId, selectFields = null) => {
    try {
        const query = User_1.default.findById(userId);
        if (selectFields) {
            query.select(selectFields);
        }
        const user = await query.exec();
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw new Error("User not found");
    }
};
const getUser = async (userId, accessLevel) => {
    try {
        let selectFields;
        switch (accessLevel) {
            case access_levels_1.FULL_ACCESS_LEVEL:
                selectFields = "";
                break;
            case access_levels_1.BASIC_ACCESS_LEVEL:
                selectFields = "email campus";
                break;
            case access_levels_1.LIMITED_ACCESS_LEVEL:
                selectFields = "profile_picture email";
                break;
            default:
                selectFields =
                    "-password -otp_code -otp_expiry -fcm_token -account_progression -signin_method";
                break;
        }
        const query = User_1.default.findById(userId);
        if (selectFields) {
            query.select(selectFields);
        }
        const user = await query.exec();
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw new Error("User not found");
    }
};
exports.getUser = getUser;
//# sourceMappingURL=auth-helper.js.map