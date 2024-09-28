import User from "../../models/User";
export const createUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const newUser = new User({
            email,
            username,
        });
        await newUser.save();
    }
    catch (error) {
        console.log("Err", error);
    }
};
export const loginUser = (req, res) => {
    console.log("create user", req);
};
//# sourceMappingURL=index.js.map