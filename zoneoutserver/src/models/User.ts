import { Schema, Document, model, Types } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUserDocument extends Document {
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
   connections: Types.ObjectId;
   campus?: Types.ObjectId;
   createAccessToken(): string;
   createRefreshToken(): string;
}

const UserSchema: Schema<IUserDocument> = new Schema(
   {
      username: { type: String, unique: true, sparse: true },
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
      connections: { type: Schema.Types.ObjectId, ref: "UserConnection" },
      // Campus
      campus: { type: Schema.Types.ObjectId, ref: "Campus" },
   },
   {
      versionKey: false,
      timestamps: {
         createdAt: "created_at",
         updatedAt: "updated_at",
      },
   }
);

UserSchema.index({ location: "2dsphere" });

// Define Methods
UserSchema.methods.createAccessToken = function (): string {
   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
   });
};

UserSchema.methods.createRefreshToken = function (): string {
   return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
   });
};


export default model<IUserDocument>("User", UserSchema);
