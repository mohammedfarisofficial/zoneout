import { Router } from "express";
export default (app) => {
    const router = Router();
    app.use("/posts", router);
    router.get("/update", () => console.log("update hello"));
    return router;
};
//# sourceMappingURL=index.js.map