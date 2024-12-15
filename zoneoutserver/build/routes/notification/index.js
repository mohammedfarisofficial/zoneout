"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = require("../../controllers/notification/notification");
const withAuth_1 = require("../../middleware/withAuth");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/notification", router);
    router.get("/", withAuth_1.withAuth, notification_1.getNotifications);
    return router;
};
//# sourceMappingURL=index.js.map