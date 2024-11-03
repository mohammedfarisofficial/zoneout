import { Request, Response } from "express";
import User from "../../models/User";

export const createUser = async (req: Request, res: Response) => {
   try {
      const { email, username } = req.body;
      const newUser = new User({
         email,
         username,
      });
      await newUser.save();
      res.json(newUser)
   } catch (error) {
      console.log("Err", error);
   }
};

export const loginUser = (req: Request, res: Response) => {
   console.log("create user", req);
};
