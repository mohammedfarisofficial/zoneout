import { Schema, Document, model } from "mongoose";
import { IUser } from "../types/modals";

// export enum Gender {
//   male = 'male',
//   female = 'female',
//   undisclosed = 'undisclosed'
// }

const UserSchema: Schema = new Schema({
   created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   polygon: {
      type: {
         type: String,
         enum: ["Point"],
      },
      coordinates: {
         type: [Number],
      },
      required: true,
   },
});

UserSchema.index({ location: "2dsphere" });

// export default model<IUser>("User", UserSchema);
export default model("User", UserSchema);
