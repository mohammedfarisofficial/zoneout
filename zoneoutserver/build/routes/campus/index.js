"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campus_1 = require("../../controllers/campus");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/campus", router);
    router.get("/", campus_1.loadCampus);
    router.post("/", campus_1.loadOneCampus);
    // For Testing
    return router;
};
//# sourceMappingURL=index.js.map