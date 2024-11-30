import { Router } from "express";
import { acceptConnection, connectionRequest, userConnections } from "../../controllers/connection";
import { withAuth } from "../../middleware/withAuth";

export default (app: Router) => {
   const router = Router();
   app.use("/connection", router);

   router.post("/request", withAuth, connectionRequest);
   router.post("/accept", withAuth, acceptConnection);
   router.get("/user-connections", withAuth, userConnections);

   return router;
};
