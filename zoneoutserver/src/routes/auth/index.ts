import { Router } from "express";

// import usersRoute from './users';
import { createUser, loginUser } from "../../controllers";
import { oauthUser } from "../../controllers/auth";

export default (app: Router) => {
   const router = Router();
   app.use("/auth", router);

   router.get("/sign-in", loginUser);
   router.post("/sign-up", createUser);
   // Social Login
   router.post("/oauth", oauthUser);

   return router;
};
