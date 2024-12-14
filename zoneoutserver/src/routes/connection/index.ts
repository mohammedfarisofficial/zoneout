import { Router } from "express";
import {
   acceptConnectionRequest,
   getConnectionDetails,
   rejectConnectionRequest,
   sendConnectionRequest,
   userConnections,
} from "../../controllers/connection";
import { withAuth } from "../../middleware/withAuth";

export default (app: Router) => {
   const router = Router();
   app.use("/connection", router);

   router.post("/request", withAuth, sendConnectionRequest);
   router.post("/accept", withAuth, acceptConnectionRequest);
   router.post("/reject", withAuth, rejectConnectionRequest);
   router.get("/user-connections", withAuth, userConnections);
   router.get("/:connectionId", withAuth, getConnectionDetails);

   return router;
};
