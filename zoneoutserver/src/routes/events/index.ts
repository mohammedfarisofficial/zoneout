import { Router } from "express";
import { createEvent, getAllEvents } from "../../controllers/events";
import { withAuth } from "../../middleware/withAuth";

export default (app: Router) => {
   const router = Router();
   app.use("/events", router);

   router.post("/create", createEvent);
   // For Testing
   router.get("/all", withAuth, getAllEvents);

   return router;
};
