import { createServer } from "http";
import WebSocket, { Server } from "ws";
import { v4 as uuidv4 } from "uuid";
import { geohashEncode, geohashNeighbors } from "../utils/geohash";

import User from "../models/User";

import * as SOCKET_EVENTS from "../constants/socket-event";

import { IUserDocument } from "../models/User";

export interface ExtendedWebSocket extends WebSocket {
   id: string;
}

let wss: Server;
const connections: { [socketId: string]: WebSocket } = {};

export const initSocket = (server: ReturnType<typeof createServer>) => {
   wss = new Server({ server });
   wss.on("connection", (ws: ExtendedWebSocket) => {
      const socket_id = uuidv4();
      ws.id = socket_id;
      connections[socket_id] = ws;
      console.log("A user connected", ws.id);
      ws.on("message", async (message) => {
         try {
            const data = JSON.parse(message.toString());
            const { event, payload } = data;

            if (event === SOCKET_EVENTS.USER_LOCATION) {
               const { user_id, coords } = payload;
               const { latitude, longitude } = coords;

               console.log("User location update : ", user_id, coords);

               // Generate geohash
               const hash = await geohashEncode(latitude, longitude);
               await User.findByIdAndUpdate(user_id, {
                  $set: { location: [longitude, latitude], geohash: hash, socket_id: ws?.id },
               });

               const user = (await User.findById(user_id).populate(
                  "connections"
               )) as IUserDocument & { connections: IUserDocument[] };

               if (!user.connections || user.connections.length === 0) {
                  console.log("No Connections!!");
                  return;
               }

               // Broadcast to connections
               user.connections.forEach((connection: any) => {
                  if (!connection.socket_id) {
                     return;
                  }
                  const targetSocket = connections[connection?.socket_id];
                  if (targetSocket) {
                     targetSocket.send(
                        JSON.stringify({
                           event: SOCKET_EVENTS.CONNECTION_LOCATION_UPDATE,
                           data: { user_id, latitude, longitude },
                        })
                     );
                  }
               });
            }
         } catch (error) {
            // // console.error("Error handling message:", error);
         }
      });

      // Handle disconnection
      ws.on("close", () => {
         // // console.log("User disconnected", ws.id);
         delete connections[ws.id];
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
