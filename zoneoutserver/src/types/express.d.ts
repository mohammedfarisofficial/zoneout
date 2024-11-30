import { Server as SocketIOServer } from 'socket.io';
import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      io?: SocketIOServer;
      user?: { userId: string };
    }
  }
}
