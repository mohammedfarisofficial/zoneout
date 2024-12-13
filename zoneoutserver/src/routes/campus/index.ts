import { Router } from "express";
import { getCampusUsersDetails, loadCampus, loadOneCampus } from "../../controllers/campus";
import { withAuth } from "../../middleware/withAuth";

export default (app: Router) => {
   const router = Router();
   app.use("/campus", router);

   // Move this into admin side
   router.get("/", loadCampus);
   router.post("/", loadOneCampus);

   router.get("/campus-users", withAuth, getCampusUsersDetails);

   return router;
};
