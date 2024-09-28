import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createServer } from "http";

import config from "./config/env";
import { initSocket } from "./services/socket";
import connectDB from "./database";
import indexRouter from "./routes";

const app = express();
const server = createServer(app);

const startServer = async () => {
   //middlewares
   app.use(express.json());
   app.use(cors());
   app.use(bodyParser.json());
   app.use(helmet());
   app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
   app.use(morgan("common"));

   const io = initSocket(server);
   // Attach io to the req object
   app.use((req: Request, res: Response, next: NextFunction) => {
      req.io = io;
      next();
   });

   //routes
   app.use(indexRouter());

   //database
   connectDB({ db: config.mongodb.url });
   server
      .listen(config.app.port, () => console.log(`Server running on port ${config.app.port}`))
      .on("error", (error) => {
         console.log(error.message);
         process.exit(1);
      });
};

startServer();
