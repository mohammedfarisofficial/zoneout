import { createServer } from "http";
import { WebSocketServer } from "ws";
import { geohashEncode, geohashNeighbors } from "../utils/geohash";

import User from "../models/User";

import * as SOCKET_EVENTS from "../constants/socket-event";

let wss: WebSocketServer;

export const initSocket = (server: ReturnType<typeof createServer>) => {
   wss = new WebSocketServer({ server });
   wss.on("connection", (ws) => {
      console.log("A user connected");
      ws.on("message", async (message) => {
         try {
            const data = JSON.parse(message.toString());
            const { event, payload } = data;

            if (event === SOCKET_EVENTS.USER_LOCATION) {
               const { user_id, coords } = payload;
               const { latitude, longitude } = coords;

               console.log("user_id, coords", user_id, coords);
               // Generate geohash
               const hash = await geohashEncode(latitude, longitude);
               await User.findByIdAndUpdate(user_id, {
                  $set: { location: [longitude, latitude], geohash: hash },
               });

               // const neighbors = await geohashNeighbors(hash.toString());

               // const nearbyUsers = await User.find({
               //    geohash: { $in: [hash, ...neighbors] },
               // });

               // Send notification back to the client
               // console.log("nearbyUsers",nearbyUsers)
               // if (nearbyUsers.length) {
               //    ws.send(JSON.stringify({ event: "nearby-users", data: nearbyUsers }));
               // }
            }
         } catch (error) {
            console.error("Error handling message:", error);
         }
      });

      // Handle disconnection
      ws.on("close", () => {
         console.log("User disconnected");
      });
   });

   return wss;
};

export const getWSS = () => {
   if (!wss) {
      throw new Error("WebSocket server not initialized!");
   }
   return wss;
};
