import { Document, model, Schema, Types } from "mongoose";
import { CampusPolygon } from "./Campus";
export interface IUserCampus extends Document {
   userId: Types.ObjectId;
   campusId: Types.ObjectId;
   joinedAt: Date;
}
 // Schema definition
const userCampusSchema = new Schema<IUserCampus>({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   campusId: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
   joinedAt: { type: Date, default: Date.now },
});
export const UserCampus = model<IUserCampus>("UserCampus", userCampusSchema);
