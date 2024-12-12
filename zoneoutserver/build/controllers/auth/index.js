"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.refreshToken = exports.oauthUser = exports.loginUser = exports.setDOB = exports.checkCollege = exports.verifyOTP = exports.createUser = void 0;
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const validation_1 = require("../../utils/validation");
const bcrypt_1 = require("../../utils/bcrypt");
const account_progress_1 = require("../../constants/account-progress");
const signin_methods_1 = require("../../constants/signin-methods");
const campus_1 = require("../../helper/campus");
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
        if (user.account_progression === account_progress_1.SELECT_DOB_COMPLETED ||
            user.account_progression === account_progress_1.ACCOUNT_CREATED) {
            const loggedUser = user.toObject();
            // Remove sensitive data
            delete loggedUser.password;
            delete loggedUser.otp_code;
            delete loggedUser.otp_expiry;
            const access_token = user.createAccessToken();
            const refresh_token = user.createRefreshToken();
            return res.status(200).json({
                message: "Account already exist!",
                user: loggedUser,
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
const checkCollege = async (req, res) => {
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
        const campus = await (0, campus_1.findCampus)(userLocation);
        if (campus) {
            console.log("User is inside a campus:", campus.name);
            await User_1.default.findByIdAndUpdate(userId, { account_progression: account_progress_1.SELECT_COLLEGE_COMPLETED });
            return res.status(200).json({
                message: "College Found",
                college: {
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
            res.status(400).json({
                message: "User is not inside any campus",
            });
        }
        //    const testCollege = {
        //       name: "Test Collge",
        //       desc: "Test Desc",
        //    };
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error creating user", details: error.message });
    }
};
exports.checkCollege = checkCollege;
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
        const user = await User_1.default.findOneAndUpdate({ _id: userId }, { dob, account_progression: account_progress_1.SELECT_DOB_COMPLETED }, { new: true });
        if (!user) {
            return { status: 400, message: "User not found" };
        }
        return res.status(200).json({ message: "User updated successfully", user });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error adding user DOB", details: error.message });
    }
};
exports.setDOB = setDOB;
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
                return res.status(200).json({
                    message: "Account already exist!",
                    user: existingUser,
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
        ({ accessToken, newRefreshToken } = await generateRefreshTokens(refresh_token, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY, process.env.JWT_SECRET, process.env.ACCESS_TOKEN_EXPIRY));
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
async function generateRefreshTokens(token, refresh_secret, refresh_expiry, access_secret, access_expiry) {
    try {
        const payload = jsonwebtoken_1.default.verify(token, refresh_secret);
        const user = await User_1.default.findById(payload.userId);
        if (!user) {
            console.log("User not found!");
            // res.status(401).json({ message: "Invalid or expired token" });
        }
        const accessToken = await jsonwebtoken_1.default.sign({ userId: user.id }, access_secret, {
            expiresIn: access_expiry,
        });
        const newRefreshToken = await jsonwebtoken_1.default.sign({ userId: user.id }, refresh_secret, {
            expiresIn: refresh_expiry,
        });
        return { accessToken, newRefreshToken };
    }
    catch (error) {
        console.error(error);
        console.log("Invalid or expired token");
        // throw new UnauthenticatedError("Invalid or expired token");
    }
}
const getUserDetails = async (req, res) => {
    const { userId } = req.user;
    // Params checking
    if (!userId) {
        return res.status(400).json({
            error: "Missing required parameters",
        });
    }
    try {
        const user = await User_1.default.findById(userId).populate("connections", "email location");
        const formattedUser = user.toObject();
        // Remove sensitive data
        delete formattedUser.password;
        delete formattedUser.otp_code;
        delete formattedUser.otp_expiry;
        delete formattedUser.dob;
        res.status(200).json({ user: formattedUser });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error fetching user", details: error.message });
    }
};
exports.getUserDetails = getUserDetails;
//# sourceMappingURL=index.js.map