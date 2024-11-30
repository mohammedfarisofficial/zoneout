import { Router } from "express";

import authRouter from "./auth";
import postsRouter from "./posts";
import eventsRouter from "./events";
import connectionRouter from "./connection";

export default () => {
   const app = Router();

   authRouter(app);
   postsRouter(app);
   eventsRouter(app);
   connectionRouter(app);

   return app;
};
