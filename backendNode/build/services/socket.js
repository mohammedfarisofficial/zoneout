import { Server } from "socket.io";
import { geohashEncode } from "../utils/geohash";
let io;
export const initSocket = (server) => {
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
            const hash = (await geohashEncode(latitude, longitude)).toString();
            return;
            // const neighbors = await geoHashNeighbours(hash)
            // console.log(neighbors)
            // await User.findByIdAndUpdate(user_id, {
            //    $set: { location: [longitude, latitude],geohash: hash },
            // });
            console.log("Updating", user_id, longitude, latitude);
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
//# sourceMappingURL=socket.js.map