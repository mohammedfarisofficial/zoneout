"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const withAuth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        // throw new UnauthenticatedError('Authentication invalid')
        return res.status(401).json({ message: "Invalid or expired token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        req.user = { userId: payload.userId };
        console.log("Token Verified!!");
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.withAuth = withAuth;
//# sourceMappingURL=withAuth.js.map