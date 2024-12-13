import { UserCampus } from "../models/UserCampus";
import { UserCampusDetails } from "../types/campus";
import {
   BASIC_ACCESS_LEVEL,
   FULL_ACCESS_LEVEL,
   LIMITED_ACCESS_LEVEL,
} from "../constants/access-levels";


export const getUserCampus = async (userId: string, accessLevel: number) => {
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
      const userCampusRecord = (await UserCampus.findOne({ userId })
         .populate({ path: "campusId", select: selectFields })
         .exec()) as unknown as UserCampusDetails;
      if (!userCampusRecord) {
         throw new Error("No campus record found for the user");
      }
      return userCampusRecord;
   } catch (error) {
      throw new Error(`Error fetching user campus details: ${(error as Error).message}`);
   }
};
