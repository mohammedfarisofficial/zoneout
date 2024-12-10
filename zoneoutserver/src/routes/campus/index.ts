import { Router } from "express";
import { loadCampus, loadOneCampus } from "../../controllers/campus";

export default (app: Router) => {
   const router = Router();
   app.use("/campus", router);

   router.get("/", loadCampus);
   router.post("/", loadOneCampus);
   // For Testing

   return router;
};
