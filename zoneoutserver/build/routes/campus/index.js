"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campus_1 = require("../../controllers/campus");
const withAuth_1 = require("../../middleware/withAuth");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/campus", router);
    // Move this into admin side
    router.get("/", campus_1.loadCampus);
    router.post("/", campus_1.loadOneCampus);
    router.get("/campus-users", withAuth_1.withAuth, campus_1.getCampusUsersDetails);
    return router;
};
//# sourceMappingURL=index.js.map