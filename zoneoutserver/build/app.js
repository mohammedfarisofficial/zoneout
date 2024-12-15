"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const env_1 = __importDefault(require("./config/env"));
const socket_1 = require("./services/socket");
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const startServer = async () => {
    //middlewares
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use((0, morgan_1.default)("common"));
    const io = (0, socket_1.initSocket)(server);
    // Attach io to the req object
    app.use((req, res, next) => {
        app.set('io', io);
        next();
    });
    //routes
    app.use((0, routes_1.default)());
    //database
    (0, database_1.default)({ db: env_1.default.mongodb.url });
    server
        .listen(env_1.default.app.port, () => console.log(`Server running on port ${env_1.default.app.port}`))
        .on("error", (error) => {
        console.log(error.message);
        process.exit(1);
    });
};
startServer();
//# sourceMappingURL=app.js.map