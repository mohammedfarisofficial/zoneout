"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.refreshToken = exports.oauthUser = exports.loginUser = exports.setUserCampus = exports.setDOB = exports.checkCampus = exports.verifyOTP = exports.createUser = void 0;
const google_auth_library_1 = require("google-auth-library");
const User_1 = __importDefault(require("../../models/User"));
const validation_1 = require("../../utils/validation");
const bcrypt_1 = require("../../utils/bcrypt");
const account_progress_1 = require("../../constants/account-progress");
const signin_methods_1 = require("../../constants/signin-methods");
// Helpers
const campus_1 = require("../../helpers/campus");
const auth_helper_1 = require("../../helpers/auth-helper");
const UserCampus_1 = require("../../models/UserCampus");
const campus_helper_1 = require("../../helpers/campus-helper");
const access_levels_1 = require("../../constants/access-levels");
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const TEST_OTP = "000000";
const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Body:", req.body);
        // Params checking
        if (!email || !password) {
            return res.status(400).json({
                type: 1,
                error: "Missing required parameters",
            });
        }
        // Email Validation
        if (!(0, validation_1.isValidEmail)(email)) {
            return res
                .status(400)
                .json({ type: 2, email_error: "Invalid email format", password_error: "" });
        }
        // Password Validation
        if (!(0, validation_1.isValidPassword)(password)) {
            return res.status(400).json({
                type: 2,
                password_error: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character",
            });
        }
        // const otp_code = generateOtp(6);
        const otp_code = TEST_OTP;
        const otp_expiry = new Date();
        otp_expiry.setMinutes(otp_expiry.getMinutes() + 5); // 5 min
        // Check Already exiting account
        const existingAccount = await User_1.default.findOne({ email });
        if (existingAccount) {
            console.log("existingAccount", existingAccount);
            await User_1.default.findByIdAndUpdate(existingAccount._id, { otp_code, otp_expiry });
            const existingUser = existingAccount.toObject();
            // Remove sensitive data
            delete existingUser.password;
            delete existingUser.otp_code;
            delete existingUser.otp_expiry;
            delete existingUser.dob;
            return res.status(200).json({
                message: "Account already exist!",
                user: existingUser,
            });
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        // Shot OTP to email here
        const newUser = new User_1.default({
            email,
            password: hashedPassword,
            otp_code,
            otp_expiry,
            account_progression: account_progress_1.CREDENTIALS_COMPLETED,
        });
        const savedUser = await newUser.save();
        const user = savedUser.toObject();
        delete user.password;
        return res.status(200).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error creating user", details: error.message });
    }
};
exports.createUser = createUser;
const verifyOTP = async (req, res) => {
    const { userId, otp_code } = req.body;
    console.log("Body", req.body);
    // Params checking
    if (!otp_code || !userId) {
        return res.status(400).json({
            type: 1,
            error: "Missing required parameters",
        });
    }
    const user = await User_1.default.findById(userId);
    if (!user) {
        return res.status(400).json({
            type: 1,
            error: "User doesn't exist!",
        });
    }
    // Check expiration
    const otpExpiryDate = new Date(user.otp_expiry);
    if (!user.otp_code || new Date() > otpExpiryDate) {
        return res.status(400).json({
            type: 1,
            error: "OTP has expired!",
        });
    }
    // Verify OTP code
    if (otp_code === user.otp_code) {
        if (user.account_progression === account_progress_1.ACCOUNT_CREATED) {
            // User exist
            const loggedUser = user.toObject();
            // Remove sensitive data
            delete loggedUser.password;
            delete loggedUser.otp_code;
            delete loggedUser.otp_expiry;
            const access_token = user.createAccessToken();
            const refresh_token = user.createRefreshToken();
            const userCampusRecord = await (0, campus_helper_1.getUserCampus)(userId, access_levels_1.FULL_ACCESS_LEVEL);
            const user_campus = {
                _id: userCampusRecord.campus._id,
                coordinates: userCampusRecord.campus.polygon.coordinates,
                type: userCampusRecord.campus.polygon.type,
                name: userCampusRecord.campus.name,
            };
            return res.status(200).json({
                user: loggedUser,
                user_campus,
                account_status: account_progress_1.VERIFIED_ACCOUNT,
                tokens: { access_token, refresh_token },
            });
        }
        else {
            await User_1.default.findByIdAndUpdate(userId, { account_progression: account_progress_1.OTP_COMPLETED });
            return res.status(200).json({
                message: "Correct OTP code",
                user,
                account_status: account_progress_1.NO_ACCOUNT,
            });
        }
    }
    else {
        return res.status(400).json({
            error: "Incorrect OTP code!",
        });
    }
};
exports.verifyOTP = verifyOTP;
const checkCampus = async (req, res) => {
    try {
        const { userId, coords } = req.body;
        console.log("params", req.body);
        // const userCoords = { latitude: 10.020317806691374, longitude: 76.33294685403126}
        // Params checking
        if (!userId || !coords) {
            return res.status(400).json({
                error: "Missing required parameters",
            });
        }
        const userLocation = {
            type: "Point",
            coordinates: [coords.lng, coords.lat],
        };
        const campus = await (0, campus_1.findCampusByUserLocation)(userLocation);
        if (campus) {
            console.log("User is inside a campus:", campus.name);
            return res.status(200).json({
                message: "User is inside a campus",
                campus: {
                    _id: campus._id,
                    coordinates: campus.polygon.coordinates,
                    type: campus.polygon.type,
                    name: campus.name,
                },
                // college: NGO_POLYGON.features[0].geometry,
            });
        }
        else {
            console.log("User is not inside any campus.");
            return res.status(400).json({
                message: "User is not inside any campus",
            });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error creating user", details: error.message });
    }
};
exports.checkCampus = checkCampus;
const setDOB = async (req, res) => {
    const { dob, userId } = req.body;
    console.log("setDOB body: ", req.body);
    // Params checking
    if (!userId || !dob) {
        return res.status(400).json({
            error: "Missing required parameters",
        });
    }
    try {
        const user = await User_1.default.findOneAndUpdate({ _id: userId }, { dob, account_progression: account_progress_1.ACCOUNT_CREATED }, { new: true });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // if (!user.campus) {
        //    return res.status(400).json({ message: "User campus not found" });
        // }
        const loggedUser = user.toObject();
        // Remove sensitive data
        delete loggedUser.password;
        delete loggedUser.otp_code;
        delete loggedUser.otp_expiry;
        console.log(process.env.ACCESS_TOKEN_EXPIRY);
        const access_token = user.createAccessToken();
        const refresh_token = user.createRefreshToken();
        const userCampusRecord = await (0, campus_helper_1.getUserCampus)(userId, access_levels_1.FULL_ACCESS_LEVEL);
        const user_campus = {
            _id: userCampusRecord.campus._id,
            coordinates: userCampusRecord.campus.polygon.coordinates,
            type: userCampusRecord.campus.polygon.type,
            name: userCampusRecord.campus.name,
        };
        return res.status(200).json({
            user: loggedUser,
            user_campus,
            account_status: account_progress_1.VERIFIED_ACCOUNT,
            tokens: { access_token, refresh_token },
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error adding user DOB", details: error.message });
    }
};
exports.setDOB = setDOB;
const setUserCampus = async (req, res) => {
    const { userId, campusId } = req.body;
    console.log("setUserCampus body: ", req.body);
    // Params checking
    if (!userId || !campusId) {
        return res.status(400).json({
            error: "Missing required parameters",
        });
    }
    try {
        const campus = await (0, campus_1.findCampusById)(campusId);
        const user = await (0, auth_helper_1.getUser)(userId, access_levels_1.FULL_ACCESS_LEVEL);
        if (!campus) {
            return res.status(400).json("Invalid campusId!");
        }
        if (user.campus) {
            return res.status(400).json("User already selected the campus!");
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, { campus: campusId, account_progression: account_progress_1.SELECT_COLLEGE_COMPLETED }, { new: true });
        const userCampus = new UserCampus_1.UserCampus({
            user: userId,
            campus: updatedUser.campus,
        });
        await userCampus.save();
        return res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error setUserCampus", message: error.message });
    }
};
exports.setUserCampus = setUserCampus;
const loginUser = (req, res) => {
    // const { userId } = req.body;
    // console.log("setDOB body: ", req.body);
    // // Params checking
    // if (!userId || !dob) {
    //    return res.status(400).json({
    //       error: "Missing required parameters",
    //    });
    // }
};
exports.loginUser = loginUser;
const oauthUser = async (req, res) => {
    const { provider, id_token } = req.body;
    if (provider === "google") {
        const ticket = await googleClient.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log("payload", payload, provider);
        const { picture, email } = ticket.getPayload();
        // Params checking
        if (!picture && !email) {
            return res.status(400).json({
                error: "Missing required parameters",
            });
        }
        // Check Already exiting account
        const existingAccount = await User_1.default.findOne({ email });
        if (existingAccount) {
            if (existingAccount.signin_method === signin_methods_1.SIGNIN_WITH_GOOGLE) {
                const existingUser = existingAccount.toObject();
                const access_token = existingAccount.createAccessToken();
                const refresh_token = existingAccount.createRefreshToken();
                const userCampusRecord = await (0, campus_helper_1.getUserCampus)(existingAccount._id, access_levels_1.FULL_ACCESS_LEVEL);
                const user_campus = {
                    _id: userCampusRecord.campus._id,
                    coordinates: userCampusRecord.campus.polygon.coordinates,
                    type: userCampusRecord.campus.polygon.type,
                    name: userCampusRecord.campus.name,
                };
                return res.status(200).json({
                    message: "Account already exist!",
                    user: existingUser,
                    user_campus,
                    account_status: account_progress_1.VERIFIED_ACCOUNT,
                    tokens: { access_token, refresh_token },
                });
            }
            else {
                return res.status(400).json({
                    error: "Something went wrong!",
                });
            }
        }
        // Create New User
        const newUser = new User_1.default({
            email,
            signin_method: signin_methods_1.SIGNIN_WITH_GOOGLE,
            account_progression: account_progress_1.OTP_COMPLETED,
        });
        const savedUser = await newUser.save();
        const user = savedUser.toObject();
        console.log("user", user);
        return res.status(200).json({
            message: "User created successfully",
            user,
            account_status: account_progress_1.NO_ACCOUNT,
        });
    }
};
exports.oauthUser = oauthUser;
const refreshToken = async (req, res) => {
    console.log("Hit");
    const { refresh_token } = req.body;
    if (!refresh_token) {
        // Params checking
        return res.status(400).json({
            error: "Missing required parameters",
        });
    }
    try {
        let accessToken, newRefreshToken;
        ({ accessToken, newRefreshToken } = await (0, auth_helper_1.generateRefreshTokens)(refresh_token, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY, process.env.JWT_SECRET, process.env.ACCESS_TOKEN_EXPIRY));
        res.status(200).json({
            access_token: accessToken,
            refresh_token: newRefreshToken,
        });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.refreshToken = refreshToken;
const getUserDetails = async (req, res) => {
    const { userId } = req.user; // Params checking
    try {
        const user = await (0, auth_helper_1.getUser)(userId, access_levels_1.FULL_ACCESS_LEVEL);
        const userCampusRecord = await (0, campus_helper_1.getUserCampus)(userId, access_levels_1.FULL_ACCESS_LEVEL);
        // const getCampusUsersRecords = await getCampusUsers(user.campus, BASIC_ACCESS_LEVEL);
        const user_campus = {
            _id: userCampusRecord.campus._id,
            coordinates: userCampusRecord.campus.polygon.coordinates,
            type: userCampusRecord.campus.polygon.type,
            name: userCampusRecord.campus.name,
        };
        res.status(200).json({ user, user_campus });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error fetching user", details: error.message });
    }
};
exports.getUserDetails = getUserDetails;
//# sourceMappingURL=index.js.map