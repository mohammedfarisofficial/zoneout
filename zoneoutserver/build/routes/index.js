import { Router } from "express";
import authRouter from "./auth";
import postsRouter from "./posts";
export default () => {
    const app = Router();
    authRouter(app);
    postsRouter(app);
    return app;
};
//# sourceMappingURL=index.js.map