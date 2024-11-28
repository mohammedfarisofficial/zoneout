import { Router } from "express";

// import usersRoute from './users';
import { createUser, loginUser } from "../../controllers";
import { checkCollege, oauthUser, setDOB, verifyOTP } from "../../controllers/auth";

export default (app: Router) => {
   const router = Router();
   app.use("/auth", router);

   router.get("/sign-in", loginUser);
   router.post("/sign-up", createUser);
   router.post("/verify-otp", verifyOTP);
   router.post("/check-collage", checkCollege);
   router.post("/set-dob", setDOB);
   // Social Login
   router.post("/oauth", oauthUser);

   return router;
};
