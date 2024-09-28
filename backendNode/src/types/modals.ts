import { Document } from "mongoose";

export interface IUser extends Document {
   username: number;
   email: string;
   socket_id: string;
   location : [number]
   geohash:string
}
