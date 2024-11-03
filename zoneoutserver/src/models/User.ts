import { Schema, Document, model } from "mongoose";
import { IUser } from "../types/modals";
import locationSchema from "./Location";

// export enum Gender {
//   male = 'male',
//   female = 'female',
//   undisclosed = 'undisclosed'
// }

const UserSchema: Schema = new Schema({
   username: {
      type: String,
   },
   email: {
      type: String,
      required: true,
   },
   socket_id: {
      type: String,
   },
   geohash: {
      type: String,
   },
   location: {
      type: {
         type: String,
         enum: ["Point"],
      },
      coordinates: {
         type: [Number],
      },
   },
});

UserSchema.index({ location: "2dsphere" });

// export default model<IUser>("User", UserSchema);
export default model("User", UserSchema);
