"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const auth_1 = require("../../controllers/auth");
const withAuth_1 = require("../../middleware/withAuth");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use("/auth", router);
    router.get("/sign-in", controllers_1.loginUser);
    router.post("/sign-up", controllers_1.createUser);
    router.post("/verify-otp", auth_1.verifyOTP);
    router.post("/check-campus", auth_1.checkCampus);
    router.post("/set-dob", auth_1.setDOB);
    router.post("/set-campus", auth_1.setUserCampus);
    router.post("/refresh-token", auth_1.refreshToken);
    router.get("/user-details", withAuth_1.withAuth, auth_1.getUserDetails);
    // Social Login
    router.post("/oauth", auth_1.oauthUser);
    return router;
};
//# sourceMappingURL=index.js.map