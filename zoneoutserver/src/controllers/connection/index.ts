import { Request, Response } from "express";
import User from "../../models/User";

import {
   setConnectionNotification,
   updateConnectionNotification,
} from "../../helpers/notification-helper";
import { NOTIFICATION_TYPE_CONNECTION_REQUEST } from "../../constants/notification";
import { ConnectionRequestStatus, UserConnectionRequest } from "../../models/UserConnectionRequest";
import { UserConnection } from "../../models/UserConnection";

export const sendConnectionRequest = async (req: Request, res: Response) => {
   const { userId } = req.user;
   const { receiverId } = req.body;

   if (!userId || !receiverId) {
      return res.status(400).send({ error: "Sender and receiver IDs are required." });
   }

   if (userId === receiverId) {
      return res.status(400).send({ error: "You cannot send a connection request to yourself." });
   }

   try {
      const existingRequest = await UserConnectionRequest.findOne({
         sender: userId,
         receiver: receiverId,
      });

      if (existingRequest) {
         return res.status(400).send({ error: "Connection request already exists." });
      }

      const newRequest = await UserConnectionRequest.create({
         sender: userId,
         receiver: receiverId,
         status: ConnectionRequestStatus.PENDING,
      });

      // Send Push Notification

      // Send Notification
      const connectionNotification = {
         user: receiverId,
         type: NOTIFICATION_TYPE_CONNECTION_REQUEST,
         data: {
            senderId: userId,
            requestId: newRequest._id,
            message: "You have a new friend request",
            status: ConnectionRequestStatus.PENDING,
         },
      };
      await setConnectionNotification(connectionNotification);
      res.status(200).send({
         message: "Connection request sent successfully.",
         request: newRequest,
      });
   } catch (error) {
      console.error("Error sending user connection request:", error);
      res.status(500).send({ error: "Failed to send connection request." });
   }
};

export const acceptConnectionRequest = async (req: Request, res: Response) => {
   const { userId } = req.user;
   const { requestId, notificationId } = req.body;

   if (!userId || !requestId) {
      return res.status(400).send({ error: "Request ID and user ID are required." });
   }

   try {
      const request = await UserConnectionRequest.findOne({
         _id: requestId,
         receiver: userId,
         status: ConnectionRequestStatus.PENDING,
      });

      if (!request) {
         return res
            .status(404)
            .send({ error: "Connection request not found or already processed." });
      }

      request.status = ConnectionRequestStatus.ACCEPTED;
      await request.save();

      // Add connections for both users
      await UserConnection.updateOne(
         { user: userId },
         { $addToSet: { connections: request.sender } },
         { upsert: true } // Create the document if it doesn't exist
      );

      await UserConnection.updateOne(
         { user: request.sender },
         { $addToSet: { connections: userId } },
         { upsert: true }
      );

      const updatedNotification = await updateConnectionNotification(
         notificationId,
         ConnectionRequestStatus.ACCEPTED
      );
      res.status(200).json({
         message: "Connection request accepted.",
         notification: updatedNotification,
      });
   } catch (error) {
      console.error("Error accepting user connection request:", error);
      res.status(500).send({ error: "Failed to accept connection request." });
   }
};

export const rejectConnectionRequest = async (req: Request, res: Response) => {
   const { userId } = req.user;
   const { requestId, notificationId } = req.body;

   if (!userId || !requestId) {
      return res.status(400).send({ error: "Request ID and user ID are required." });
   }

   try {
      const request = await UserConnectionRequest.findOne({
         _id: requestId,
         receiver: userId,
         status: ConnectionRequestStatus.PENDING,
      });

      if (!request) {
         return res
            .status(404)
            .send({ error: "Connection request not found or already processed." });
      }

      request.status = ConnectionRequestStatus.REJECTED;
      await request.save();

      const updatedNotification = await updateConnectionNotification(
         notificationId,
         ConnectionRequestStatus.REJECTED
      );

      res.status(200).json({
         message: "Connection request rejected.",
         notification: updatedNotification,
      });
   } catch (error) {
      console.error("Error rejecting user connection request:", error);
      res.status(500).send({ error: "Failed to reject connection request." });
   }
};

export const userConnections = async (req: Request, res: Response) => {
   const { userId } = req.user;

   try {
      const userConnections = await UserConnection.findOne({ user: userId }).populate(
         "connections",
         "email location" // Include only necessary fields
      );

      if (!userConnections || userConnections.connections.length === 0) {
         return res.status(404).send({ error: "No connections found." });
      }

      res.status(200).send({ connections: userConnections.connections });
   } catch (error) {
      console.error("Error fetching user connections:", error);
      res.status(500).send({ error: "Failed to fetch user connections." });
   }
};

export const getConnectionDetails = async (req: Request, res: Response) => {
   const { connectionId } = req.params;

   if (!connectionId) {
      return res.status(400).json({
         error: "Missing required parameter: connectionId",
      });
   }

   try {
      // Find the user details
      const connectionDetails = await User.findById(connectionId).select(
         "_id email name location profilePicture"
      );

      if (!connectionDetails) {
         return res.status(404).json({
            error: "Connection not found.",
         });
      }

      res.status(200).json({
         message: "Connection details retrieved successfully.",
         connection: connectionDetails,
      });
   } catch (error) {
      console.error("Error fetching connection details:", error);
      res.status(500).json({
         error: "Failed to fetch connection details.",
      });
   }
};
