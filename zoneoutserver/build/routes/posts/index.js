"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/posts", router);
    router.get("/update", () => console.log("update hello"));
    return router;
};
//# sourceMappingURL=index.js.map