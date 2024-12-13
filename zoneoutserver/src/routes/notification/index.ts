import { Router } from "express";
import { getNotifications } from "../../controllers/notification/notification";
import { withAuth } from "../../middleware/withAuth";

export default (app: Router) => {
   const router = Router();
   app.use("/notification", router);

   router.get("/", withAuth, getNotifications);

   return router;
};
