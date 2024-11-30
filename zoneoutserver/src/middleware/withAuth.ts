import jwt from "jsonwebtoken";

export const withAuth = async (req, res, next) => {
   // check header
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer")) {
      // throw new UnauthenticatedError('Authentication invalid')
      res.status(401).json({ message: "Invalid or expired token" });
   }
   const token = authHeader.split(" ")[1];

   try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // attach the user to the job routes
      req.user = { userId: payload.userId };
      console.log("Token Verified!!");
      next();
   } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
   }
};
