import { Router } from "express";
import { createUser, loginUser } from "../../controllers";
import {
   checkCollege,
   getUserDetails,
   oauthUser,
   refreshToken,
   setDOB,
   verifyOTP,
} from "../../controllers/auth";
import { withAuth } from "../../middleware/withAuth";

export default (app: Router) => {
   const router = Router();
   app.use("/auth", router);

   router.get("/sign-in", loginUser);
   router.post("/sign-up", createUser);
   router.post("/verify-otp", verifyOTP);
   router.post("/check-collage", checkCollege);
   router.post("/set-dob", setDOB);
   router.post("/refresh-token", refreshToken);
   router.get("/user-details", withAuth, getUserDetails);
   // Social Login
   router.post("/oauth", oauthUser);

   return router;
};
