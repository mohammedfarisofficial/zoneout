import { Server as SocketIOServer } from 'socket.io';

declare global {
  namespace Express {
    export interface Request {
      io?: SocketIOServer;
      user?: { userId: string };
    }
  }
}
