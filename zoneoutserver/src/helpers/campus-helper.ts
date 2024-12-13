import { UserCampus } from "../models/UserCampus";
import { UserCampusDetails } from "../types/campus";
import {
   BASIC_ACCESS_LEVEL,
   FULL_ACCESS_LEVEL,
   LIMITED_ACCESS_LEVEL,
} from "../constants/access-levels";
import Campus from "../models/Campus";

export const getUserCampus = async (userId: string | unknown, accessLevel: number) => {
   try {
      let selectFields: string;
      switch (accessLevel) {
         case FULL_ACCESS_LEVEL:
            selectFields = "_id name polygon website wikidata wikipedia addr contact operator";
            break;
         case BASIC_ACCESS_LEVEL:
            selectFields = "_id name polygon.type";
            break;
         case LIMITED_ACCESS_LEVEL:
            selectFields = "_id name polygon.type polygon.coordinates";
            break;
         default:
            throw new Error("Invalid access level");
      }
      const userCampusRecord = (await UserCampus.findOne({ user: userId })
         .populate({ path: "campus", select: selectFields })
         .exec()) as unknown as UserCampusDetails;
      if (!userCampusRecord) {
         throw new Error("No campus record found for the user");
      }
      return userCampusRecord;
   } catch (error) {
      throw new Error(`Error fetching user campus details: ${(error as Error).message}`);
   }
};

export const getCampusUsers = async (campusId: string | unknown, accessLevel: number) => {
   try {
      let selectFields: string;
      switch (accessLevel) {
         case FULL_ACCESS_LEVEL:
            selectFields = "";
            break;
         case BASIC_ACCESS_LEVEL:
            selectFields = "_id email";
            break;
         case LIMITED_ACCESS_LEVEL:
            selectFields = "";
            break;
         default:
            throw new Error("Invalid access level");
      }
      const CampusUsersRecords = (await UserCampus.find({ campus: campusId })
         .populate({ path: "user", select: selectFields })
         .exec()) as unknown as UserCampusDetails[];
      if (!CampusUsersRecords || !CampusUsersRecords.length) {
         console.log("No campus record found for the user");
         return false;
      }
      return CampusUsersRecords;
   } catch (error) {
      console.log(`Error fetching user campus details: ${(error as Error).message}`);
      return false;
   }
};
