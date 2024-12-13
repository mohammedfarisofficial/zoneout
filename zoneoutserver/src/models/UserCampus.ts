import { Document, model, Schema, Types } from "mongoose";
export interface IUserCampus extends Document {
   user: Types.ObjectId;
   campus: Types.ObjectId;
}
// Schema definition
const userCampusSchema = new Schema<IUserCampus>(
   {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
   },
   {
      versionKey: false,
      timestamps: {
         createdAt: "created_at",
         updatedAt: "updated_at",
      },
   }
);
export const UserCampus = model<IUserCampus>("UserCampus", userCampusSchema);
