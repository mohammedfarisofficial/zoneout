"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("no .env file found");
}
exports.default = {
    app: {
        port: parseInt(process.env.PORT, 10),
        // apiPrefix: process.env.API_PREFIX
    },
    mongodb: {
        url: process.env.MONGODB_URL,
    },
};
//# sourceMappingURL=index.js.map