import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import User from "../../models/User";

import { isValidEmail, isValidPassword } from "../../utils/validation";
import { hashPassword } from "../../utils/bcrypt";
import { generateOtp } from "../../utils/otp";
import { NGO_POLYGON } from "../../data";

import {
   // AC Status
   ACCOUNT_CREATED,
   NO_ACCOUNT,
   // AC Creation progress
   CREDENTIALS_COMPLETED,
   OTP_COMPLETED,
   SELECT_COLLEGE_COMPLETED,
   SELECT_DOB_COMPLETED,
   VERIFIED_ACCOUNT,
} from "../../constants/account-progress";

import { SIGNIN_WITH_GOOGLE } from "../../constants/signin-methods";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const TEST_OTP = "000000";

export const createUser = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      console.log("Body:", req.body);

      // Params checking
      if (!email || !password) {
         return res.status(400).json({
            type: 1,
            error: "Missing required parameters",
         });
      }

      // Email Validation
      if (!isValidEmail(email)) {
         return res
            .status(400)
            .json({ type: 2, email_error: "Invalid email format", password_error: "" });
      }

      // Password Validation
      if (!isValidPassword(password)) {
         return res.status(400).json({
            type: 2,
            password_error:
               "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character",
         });
      }

      // const otp_code = generateOtp(6);
      const otp_code = TEST_OTP;
      const otp_expiry = new Date();
      otp_expiry.setMinutes(otp_expiry.getMinutes() + 5); // 5 min

      // Check Already exiting account
      const existingAccount = await User.findOne({ email });
      if (existingAccount) {
         console.log("existingAccount", existingAccount);
         await User.findByIdAndUpdate(existingAccount._id, { otp_code, otp_expiry });

         const existingUser = existingAccount.toObject();
         // Remove sensitive data
         delete existingUser.password;
         delete existingUser.otp_code;
         delete existingUser.otp_expiry;
         delete existingUser.dob;

         return res.status(200).json({
            message: "Account already exist!",
            user: existingUser,
         });
      }

      const hashedPassword = await hashPassword(password);

      // Shot OTP to email here

      const newUser = new User({
         email,
         password: hashedPassword,
         otp_code,
         otp_expiry,
         account_progression: CREDENTIALS_COMPLETED,
      });
      const savedUser = await newUser.save();
      const user = savedUser.toObject();
      delete user.password;
      return res.status(200).json({
         message: "User created successfully",
         user,
      });
   } catch (error: unknown) {
      return res
         .status(500)
         .json({ error: "Error creating user", details: (error as Error).message });
   }
};

export const verifyOTP = async (req: Request, res: Response) => {
   const { userId, otp_code } = req.body;
   console.log("Body", req.body);

   // Params checking
   if (!otp_code || !userId) {
      return res.status(400).json({
         type: 1,
         error: "Missing required parameters",
      });
   }

   const user = await User.findById(userId);

   if (!user) {
      return res.status(400).json({
         type: 1,
         error: "User doesn't exist!",
      });
   }

   // Check expiration
   const otpExpiryDate = new Date(user.otp_expiry);

   if (!user.otp_code || new Date() > otpExpiryDate) {
      return res.status(400).json({
         type: 1,
         error: "OTP has expired!",
      });
   }

   // Verify OTP code
   if (otp_code === user.otp_code) {
      if (
         user.account_progression === SELECT_DOB_COMPLETED ||
         user.account_progression === ACCOUNT_CREATED
      ) {
         const loggedUser = user.toObject();
         // Remove sensitive data
         delete loggedUser.password;
         delete loggedUser.otp_code;
         delete loggedUser.otp_expiry;

         const access_token = user.createAccessToken();
         const refresh_token = user.createRefreshToken();

         return res.status(200).json({
            message: "Account already exist!",
            user: loggedUser,
            account_status: VERIFIED_ACCOUNT,
            tokens: { access_token, refresh_token },
         });
      } else {
         await User.findByIdAndUpdate(userId, { account_progression: OTP_COMPLETED });
         return res.status(200).json({
            message: "Correct OTP code",
            user,
            account_status: NO_ACCOUNT,
         });
      }
   } else {
      return res.status(400).json({
         error: "Incorrect OTP code!",
      });
   }
};

export const checkCollege = async (req: Request, res: Response) => {
   try {
      const { userId, coords } = req.body;

      // Params checking
      if (!userId || !coords) {
         return res.status(400).json({
            error: "Missing required parameters",
         });
      }

      const testCollege = {
         name: "Test Collge",
         desc: "Test Desc",
      };
      await User.findByIdAndUpdate(userId, { account_progression: SELECT_COLLEGE_COMPLETED });
      return res
         .status(200)
         .json({ message: "College Found", college: NGO_POLYGON.features[0].geometry });
   } catch (error: unknown) {
      return res
         .status(500)
         .json({ error: "Error creating user", details: (error as Error).message });
   }
};

export const setDOB = async (req: Request, res: Response) => {
   const { dob, userId } = req.body;
   console.log("setDOB body: ", req.body);

   // Params checking
   if (!userId || !dob) {
      return res.status(400).json({
         error: "Missing required parameters",
      });
   }
   try {
      const user = await User.findOneAndUpdate(
         { _id: userId },
         { dob, account_progression: SELECT_DOB_COMPLETED },
         { new: true }
      );
      if (!user) {
         return { status: 400, message: "User not found" };
      }

      return res.status(200).json({ message: "User updated successfully", user });
   } catch (error) {
      return res
         .status(500)
         .json({ error: "Error adding user DOB", details: (error as Error).message });
   }
};

export const loginUser = (req: Request, res: Response) => {
   // const { userId } = req.body;
   // console.log("setDOB body: ", req.body);
   // // Params checking
   // if (!userId || !dob) {
   //    return res.status(400).json({
   //       error: "Missing required parameters",
   //    });
   // }
};

export const oauthUser = async (req: Request, res: Response) => {
   const { provider, id_token } = req.body;
   if (provider === "google") {
      const ticket = await googleClient.verifyIdToken({
         idToken: id_token,
         audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log("payload", payload, provider);
      const { picture, email } = ticket.getPayload();

      // Params checking
      if (!picture && !email) {
         return res.status(400).json({
            error: "Missing required parameters",
         });
      }

      // Check Already exiting account
      const existingAccount = await User.findOne({ email });
      if (existingAccount) {
         if (existingAccount.signin_method === SIGNIN_WITH_GOOGLE) {
            const existingUser = existingAccount.toObject();
            const access_token = existingAccount.createAccessToken();
            const refresh_token = existingAccount.createRefreshToken();

            return res.status(200).json({
               message: "Account already exist!",
               user: existingUser,
               account_status: VERIFIED_ACCOUNT,
               tokens: { access_token, refresh_token },
            });
         } else {
            return res.status(400).json({
               error: "Something went wrong!",
            });
         }
      }

      // Create New User
      const newUser = new User({
         email,
         signin_method: SIGNIN_WITH_GOOGLE,
         account_progression: OTP_COMPLETED,
      });
      const savedUser = await newUser.save();
      const user = savedUser.toObject();
      console.log("user", user);
      return res.status(200).json({
         message: "User created successfully",
         user,
         account_status: NO_ACCOUNT,
      });
   }
};

export const refreshToken = async (req: Request, res: Response) => {
   console.log("Hit");
   const { refresh_token } = req.body;
   if (!refresh_token) {
      // Params checking
      return res.status(400).json({
         error: "Missing required parameters",
      });
   }
   try {
      let accessToken, newRefreshToken;

      ({ accessToken, newRefreshToken } = await generateRefreshTokens(
         refresh_token,
         process.env.REFRESH_TOKEN_SECRET,
         process.env.REFRESH_TOKEN_EXPIRY,
         process.env.JWT_SECRET,
         process.env.ACCESS_TOKEN_EXPIRY
      ));

      res.status(200).json({
         access_token: accessToken,
         refresh_token: newRefreshToken,
      });
   } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Invalid or expired token" });
   }
};

async function generateRefreshTokens(
   token,
   refresh_secret,
   refresh_expiry,
   access_secret,
   access_expiry
) {
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
}

export const getUserDetails = async (req: Request, res: Response) => {
   const { userId } = req.user;

   // Params checking
   if (!userId) {
      return res.status(400).json({
         error: "Missing required parameters",
      });
   }
   try {
      const user = await User.findById(userId).populate("connections", "email location");
      const formattedUser = user.toObject();
      // Remove sensitive data
      delete formattedUser.password;
      delete formattedUser.otp_code;
      delete formattedUser.otp_expiry;
      delete formattedUser.dob;

      res.status(200).json({ user: formattedUser });
   } catch (error: unknown) {
      return res
         .status(500)
         .json({ error: "Error fetching user", details: (error as Error).message });
   }
};
