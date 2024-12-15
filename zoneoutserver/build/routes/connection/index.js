"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../../controllers/connection");
const withAuth_1 = require("../../middleware/withAuth");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/connection", router);
    router.post("/request", withAuth_1.withAuth, connection_1.sendConnectionRequest);
    router.post("/accept", withAuth_1.withAuth, connection_1.acceptConnectionRequest);
    router.post("/reject", withAuth_1.withAuth, connection_1.rejectConnectionRequest);
    router.get("/user-connections", withAuth_1.withAuth, connection_1.userConnections);
    router.get("/:connectionId", withAuth_1.withAuth, connection_1.getConnectionDetails);
    return router;
};
//# sourceMappingURL=index.js.map