import jwt from "jsonwebtoken";

import User from "../models/User";
import {
   BASIC_ACCESS_LEVEL,
   FULL_ACCESS_LEVEL,
   LIMITED_ACCESS_LEVEL,
} from "../constants/access-levels";

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

// User Access
const findUser = async (userId: string, selectFields: string | null = null) => {
   try {
      const query = User.findById(userId);
      if (selectFields) {
         query.select(selectFields);
      }
      const user = await query.exec();
      if (!user) {
         throw new Error("User not found");
      }
      return user;
   } catch (error) {
      throw new Error("User not found");
   }
};

export const getUser = async (userId: string, accessLevel: number) => {
   try {
      let selectFields: string;
      switch (accessLevel) {
         case FULL_ACCESS_LEVEL:
            selectFields = "";
            break;
         case BASIC_ACCESS_LEVEL:
            selectFields = "email campus";
            break;
         case LIMITED_ACCESS_LEVEL:
            selectFields = "profile_picture email";
            break;
         default:
            selectFields =
               "-password -otp_code -otp_expiry -fcm_token -account_progression -signin_method";
            break;
      }
      const query = User.findById(userId);
      if (selectFields) {
         query.select(selectFields);
      }
      const user = await query.exec();
      if (!user) {
         throw new Error("User not found");
      }
      return user;
   } catch (error) {
      throw new Error("User not found");
   }
};
