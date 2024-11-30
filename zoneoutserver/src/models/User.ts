import { Schema, Document, model, Types } from "mongoose";
import jwt from "jsonwebtoken";

// Define the User Document interface
interface IUserDocument extends Document {
   username: string;
   email: string;
   password?: string;
   profile_picture?: string;
   socket_id?: string;
   geohash?: string;
   signin_method: number;
   account_progression?: number;
   role?: number;
   otp_code?: string;
   otp_expiry?: Date;
   fcm_token?: string[];
   dob?: Date;
   location?: {
      type: string;
      coordinates: [number, number];
   };
   // Connection
   sent_requests: Types.ObjectId[];
   received_requests: Types.ObjectId[];
   connections: Types.ObjectId[];
   createAccessToken(): string;
   createRefreshToken(): string;
}

// Define the User Schema
const UserSchema: Schema<IUserDocument> = new Schema({
   username: { type: String, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String },
   profile_picture: { type: String },
   socket_id: { type: String },
   geohash: { type: String },
   signin_method: { type: Number, default: 0 },
   account_progression: { type: Number },
   role: { type: Number, default: 0 },
   otp_code: { type: String, required: false },
   otp_expiry: { type: Date, required: false },
   fcm_token: [{ type: String }],
   dob: { type: Date },
   location: {
      type: {
         type: String,
         enum: ["Point"],
      },
      coordinates: {
         type: [Number],
      },
   },
   // Connections
   sent_requests: [{ type: Schema.Types.ObjectId, ref: "User" }],
   received_requests: [{ type: Schema.Types.ObjectId, ref: "User" }],
   connections: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Index for geospatial queries
UserSchema.index({ location: "2dsphere" });

// Define Methods
UserSchema.methods.createAccessToken = function (): string {
   return jwt.sign({ userId: this._id, username: this.username }, process.env.JWT_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
   });
};

UserSchema.methods.createRefreshToken = function (): string {
   return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
   });
};

// Export the model
export default model<IUserDocument>("User", UserSchema);
