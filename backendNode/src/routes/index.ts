import { Router } from "express";

import authRouter from "./auth";
import postsRouter from "./posts";
import eventsRouter from "./events";

export default () => {
   const app = Router();

   authRouter(app);
   postsRouter(app);
   eventsRouter(app)
   return app;
};
