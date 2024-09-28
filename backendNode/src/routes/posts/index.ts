import { Router } from "express";

export default (app: Router) => {
   const router = Router();
   app.use("/posts", router);

   router.get("/update", () => console.log("update hello"));

   return router;
};
