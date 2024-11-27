import { Server } from "socket.io";
import { Server as HttpServer } from "http";

import User from "../models/User";

import { geohashEncode, geohashNeighbors } from "../utils/geohash";

let io: Server;

export const initSocket = (server: HttpServer) => {
   io = new Server(server, {
      cors: {
         origin: "*", // specify a specific origin
         methods: ["GET", "POST"], // allowed methods
      },
   });

   io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("user-location", async (data) => {
         const { user_id, coords } = data;
         const { latitude, longitude } = coords;
         //Gen user hash
         const hash = await geohashEncode(latitude, longitude);

         await User.findByIdAndUpdate(user_id, {
            $set: { location: [longitude, latitude], geohash: hash },
         });

         const neighbors = await geohashNeighbors(hash.toString());

         const nearbyUsers = await User.find({
            geohash: { $in: [hash, ...neighbors] },
         });
         // Send Notification
         console.log(nearbyUsers);
      });

      socket.on("disconnect", () => {
         console.log("User disconnected");
      });
   });

   return io;
};

export const getIO = () => {
   if (!io) {
      throw new Error("Socket.io not initialized!");
   }
   return io;
};
