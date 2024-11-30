import { Request, Response } from "express";
import User from "../../models/User";

export const connectionRequest = async (req: Request, res: Response) => {
   const { userId } = req.user;
   const { receiverId } = req.body;

   if (!userId || !receiverId) {
      return res.status(400).send({ error: "Sender and receiver IDs are required." });
   }

   try {
      // Request already exists
      const sender = await User.findOne({ _id: userId, sent_requests: receiverId });
      const receiver = await User.findOne({ _id: receiverId, received_requests: userId });

      if (sender || receiver) {
         return res.status(400).send({ error: "Connection request already exists." });
      }

      // Add the connection request
      await User.updateOne({ _id: userId }, { $addToSet: { sent_requests: receiverId } });
      await User.updateOne({ _id: receiverId }, { $addToSet: { received_requests: userId } });

      res.status(200).send({ message: "Connection request sent successfully." });
   } catch (error) {
      console.error("Error sending connection request:", error);
      res.status(500).send({ error: "Failed to send connection request." });
   }
};
export const acceptConnection = async (req: Request, res: Response) => {
   // const { userId } = req.user;
   const { receiverId, userId } = req.body;

   if (!userId || !receiverId) {
      return res.status(400).send({ error: "Both userId and receiverId are required." });
   }

   if (userId === receiverId) {
      return res
         .status(400)
         .send({ error: "You cannot accept a connection request from yourself." });
   }

   try {
      const sender = await User.findOne({ _id: userId, received_requests: receiverId });
      const receiver = await User.findOne({ _id: receiverId, sent_requests: userId });

      if (!sender || !receiver) {
         return res.status(404).send({ error: "Connection request not found." });
      }

      // Remove requests
      await User.updateOne({ _id: userId }, { $pull: { received_requests: receiverId } });
      await User.updateOne({ _id: receiverId }, { $pull: { sent_requests: userId } });

      // Add to connections
      await User.updateOne({ _id: userId }, { $addToSet: { connections: receiverId } });
      await User.updateOne({ _id: receiverId }, { $addToSet: { connections: userId } });

      res.status(200).send({ message: "Connection request accepted." });
   } catch (error) {
      console.error("Error accepting connection request:", error);
      res.status(500).send({ error: "Failed to accept connection request." });
   }
};
export const userConnections = async (req: Request, res: Response) => {
   const { userId } = req.user;
   try {
      const user = await User.findById(userId).populate("connections", "email location");

      if (!user) {
         return res.status(404).send({ error: "User not found." });
      }

      res.status(200).send({ connections: user.connections });
   } catch (error) {
      console.error("Error fetching connections:", error);
      res.status(500).send({ error: "Failed to fetch connections." });
   }
};