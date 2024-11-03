import { Router } from "express";
// import usersRoute from './users';
import { createUser, loginUser } from "../../controllers";
export default (app) => {
    const router = Router();
    app.use("/auth", router);
    router.get("/sign-in", loginUser);
    router.post("/sign-up", createUser);
    return router;
};
//# sourceMappingURL=index.js.map