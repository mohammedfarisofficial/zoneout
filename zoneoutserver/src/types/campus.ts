import { Document, Types } from "mongoose";
import { CampusPolygon } from "../models/Campus";

export interface UserCampusDetails extends Document {
    user?: Types.ObjectId;
    campus?: {
       _id: Types.ObjectId;
       name: string;
       polygon: CampusPolygon
    };
 }
