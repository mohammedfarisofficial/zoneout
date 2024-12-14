import { Schema, model, Types } from "mongoose";

const STATUS_PENDING = 1;
const STATUS_ACCEPTED = 2;
const STATUS_REJECTED = 3;

const userConnectionRequestSchema = new Schema(
   {
      sender: { type: Types.ObjectId, ref: "User", required: true },
      receiver: { type: Types.ObjectId, ref: "User", required: true },
      status: {
         type: Number,
         enum: [STATUS_PENDING, STATUS_ACCEPTED, STATUS_REJECTED],
         default: STATUS_PENDING,
      },
   },
   {
      versionKey: false,
      timestamps: {
         createdAt: "created_at",
         updatedAt: "updated_at",
      },
   }
);

userConnectionRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export const UserConnectionRequest = model("UserConnectionRequest", userConnectionRequestSchema);

export const ConnectionRequestStatus = {
   PENDING: STATUS_PENDING,
   ACCEPTED: STATUS_ACCEPTED,
   REJECTED: STATUS_REJECTED,
};
