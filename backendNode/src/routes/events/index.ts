import { Router } from "express";
import { createEvent } from "../../controllers/events";

export default (app: Router) => {
   const router = Router();
   app.use("/events", router);

   router.post("/create", createEvent);

   return router;
};
