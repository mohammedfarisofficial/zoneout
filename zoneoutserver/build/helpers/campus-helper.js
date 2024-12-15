"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampusUsers = exports.getUserCampus = void 0;
const UserCampus_1 = require("../models/UserCampus");
const access_levels_1 = require("../constants/access-levels");
const getUserCampus = async (userId, accessLevel) => {
    try {
        let selectFields;
        switch (accessLevel) {
            case access_levels_1.FULL_ACCESS_LEVEL:
                selectFields = "_id name polygon website wikidata wikipedia addr contact operator";
                break;
            case access_levels_1.BASIC_ACCESS_LEVEL:
                selectFields = "_id name polygon.type";
                break;
            case access_levels_1.LIMITED_ACCESS_LEVEL:
                selectFields = "_id name polygon.type polygon.coordinates";
                break;
            default:
                throw new Error("Invalid access level");
        }
        const userCampusRecord = (await UserCampus_1.UserCampus.findOne({ user: userId })
            .populate({ path: "campus", select: selectFields })
            .exec());
        if (!userCampusRecord) {
            throw new Error("No campus record found for the user");
        }
        return userCampusRecord;
    }
    catch (error) {
        throw new Error(`Error fetching user campus details: ${error.message}`);
    }
};
exports.getUserCampus = getUserCampus;
const getCampusUsers = async (campusId, accessLevel) => {
    try {
        let selectFields;
        switch (accessLevel) {
            case access_levels_1.FULL_ACCESS_LEVEL:
                selectFields = "";
                break;
            case access_levels_1.BASIC_ACCESS_LEVEL:
                selectFields = "_id email";
                break;
            case access_levels_1.LIMITED_ACCESS_LEVEL:
                selectFields = "";
                break;
            default:
                throw new Error("Invalid access level");
        }
        const CampusUsersRecords = (await UserCampus_1.UserCampus.find({ campus: campusId })
            .populate({ path: "user", select: selectFields })
            .exec());
        if (!CampusUsersRecords || !CampusUsersRecords.length) {
            console.log("No campus record found for the user");
            return false;
        }
        return CampusUsersRecords;
    }
    catch (error) {
        console.log(`Error fetching user campus details: ${error.message}`);
        return false;
    }
};
exports.getCampusUsers = getCampusUsers;
//# sourceMappingURL=campus-helper.js.map