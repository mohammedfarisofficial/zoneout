import { Document, Types } from "mongoose";
import { CampusPolygon } from "../models/Campus";

export interface UserCampusDetails extends Document {
    userId?: Types.ObjectId;
    campusId?: {
       _id: Types.ObjectId;
       name: string;
       polygon: CampusPolygon
    };
    joinedAt: Date;
 }
