import { Schema, model, Types } from "mongoose";

const userConnectionSchema = new Schema(
   {
      user: { type: Types.ObjectId, ref: "User", required: true },
      connections: [{ type: Types.ObjectId, ref: "User" }],
   },
   {
      versionKey: false,
      timestamps: {
         createdAt: "created_at",
         updatedAt: "updated_at",
      },
   }
);

export const UserConnection = model("UserConnection", userConnectionSchema);
