import { Router } from "express";

import authRouter from "./auth";
import postsRouter from "./posts";
import eventsRouter from "./events";
import connectionRouter from "./connection";
import campusRouter from "./campus";

export default () => {
   const app = Router();

   authRouter(app);
   postsRouter(app);
   eventsRouter(app);
   campusRouter(app);
   connectionRouter(app);

   return app;
};
