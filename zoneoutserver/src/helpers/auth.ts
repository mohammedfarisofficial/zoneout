import jwt from "jsonwebtoken";

import User from "../models/User";

export const generateRefreshTokens = async (
   token,
   refresh_secret,
   refresh_expiry,
   access_secret,
   access_expiry
) => {
   try {
      const payload = jwt.verify(token, refresh_secret);
      const user = await User.findById(payload.userId);
      if (!user) {
         console.log("User not found!");
         // res.status(401).json({ message: "Invalid or expired token" });
      }

      const accessToken = await jwt.sign({ userId: user.id }, access_secret, {
         expiresIn: access_expiry,
      });

      const newRefreshToken = await jwt.sign({ userId: user.id }, refresh_secret, {
         expiresIn: refresh_expiry,
      });

      return { accessToken, newRefreshToken };
   } catch (error) {
      console.error(error);
      console.log("Invalid or expired token");
      // throw new UnauthenticatedError("Invalid or expired token");
   }
};

export const findUserById = async (userId: string) => {
   try {
      const user = await User.findById(userId);
      if (!user) {
         throw new Error("User not found");
      }
      return user;
   } catch (error) {
      throw new Error("User not found");
   }
};
