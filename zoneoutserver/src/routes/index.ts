import { Router } from "express";

import authRouter from "./auth";
import postsRouter from "./posts";
import eventsRouter from "./events";
import connectionRouter from "./connection";
import campusRouter from "./campus";
import notificationRouter from "./notification";

export default () => {
   const app = Router();

   authRouter(app);
   postsRouter(app);
   eventsRouter(app);
   campusRouter(app);
   connectionRouter(app);
   notificationRouter(app);

   return app;
};
