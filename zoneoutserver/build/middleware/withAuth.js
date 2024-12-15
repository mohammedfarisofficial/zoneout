"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const withAuth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Token is missing" });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                console.log("Token has expired");
                return res.status(401).json({ message: "Token has expired" });
            }
            else {
                console.log("Invalid token :", token);
                return res.status(401).json({ message: "Invalid token" });
            }
        }
        req.user = user;
        next();
    });
};
exports.withAuth = withAuth;
//# sourceMappingURL=withAuth.js.map