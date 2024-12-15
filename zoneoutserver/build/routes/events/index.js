"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_1 = require("../../controllers/events");
const withAuth_1 = require("../../middleware/withAuth");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/events", router);
    router.post("/create", events_1.createEvent);
    // For Testing
    router.get("/all", withAuth_1.withAuth, events_1.getAllEvents);
    return router;
};
//# sourceMappingURL=index.js.map