import { Request, Response } from "express";
import { getUserNotifications } from "../../helpers/notification-helper";

export const getNotifications = async (req: Request, res: Response) => {
   const { userId } = req.user;
   try {
      const userNotifications = await getUserNotifications(userId);

      console.log("userNotifications",userNotifications)

      if (!userNotifications) {
         return res.status(400).json({ type: 1, message: "User notication is empty!" });
      }
      return res.status(200).json({ notifications: userNotifications });
   } catch (error) {
      console.log("getNotifications", Error);
   }
};
