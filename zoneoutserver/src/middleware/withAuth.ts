import jwt from "jsonwebtoken";

export const withAuth = async (req, res, next) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) return res.status(401).json({ message: "Token is missing" });

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
         if (err.name === "TokenExpiredError") {
            console.log("Token has expired");
            return res.status(401).json({ message: "Token has expired" });
         } else {
            console.log("Invalid token :", token);
            return res.status(401).json({ message: "Invalid token" });
         }
      }

      req.user = user;
      next();
   });
};
