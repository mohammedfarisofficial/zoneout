import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../../models/User";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const createUser = async (req: Request, res: Response) => {
   try {
      const { email, username } = req.body;
      const newUser = new User({
         email,
         username,
      });
      await newUser.save();
      res.json(newUser);
   } catch (error) {
      console.log("Err", error);
   }
};

export const loginUser = (req: Request, res: Response) => {
   console.log("create user", req);
};

export const oauthUser = async (req: Request, res: Response) => {
   const { provider, id_token } = req.body;
   if (provider === "google") {
      const ticket = await googleClient.verifyIdToken({
         idToken: id_token,
         audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log("payload", payload);
   }
   return;
};
