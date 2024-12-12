"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const posts_1 = __importDefault(require("./posts"));
const events_1 = __importDefault(require("./events"));
const connection_1 = __importDefault(require("./connection"));
const campus_1 = __importDefault(require("./campus"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, auth_1.default)(app);
    (0, posts_1.default)(app);
    (0, events_1.default)(app);
    (0, campus_1.default)(app);
    (0, connection_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map