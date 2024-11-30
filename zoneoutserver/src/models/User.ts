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
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
   },
   socket_id: {
      type: String,
   },
   geohash: {
      type: String,
   },
   signin_method: {
      type: Number,
      default: 0,
   },
   account_progression: { type: Number },
   otp_code: { type: String, required: false },
   otp_expiry: { type: Date, required: false },
   dob: Date,
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
