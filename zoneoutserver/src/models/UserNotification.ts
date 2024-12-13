import { Document, model, Schema, Types } from "mongoose";

export interface IUserNotification extends Document {
   user: Types.ObjectId;
   type: number;
   data: any;
   is_read: boolean;
}

const userNotificationSchema = new Schema<IUserNotification>(
   {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      type: { type: Number, required: true },
      data: { type: Schema.Types.Mixed },
      is_read: { type: Boolean, default: false },
   },
   {
      versionKey: false,
      timestamps: {
         createdAt: "created_at",
         updatedAt: "updated_at",
      },
   }
);

export const UserNotification = model<IUserNotification>(
   "UserNotification",
   userNotificationSchema
);
