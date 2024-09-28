import { Schema, model } from "mongoose";
// export enum Gender {
//   male = 'male',
//   female = 'female',
//   undisclosed = 'undisclosed'
// }
const UserSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    socket_id: {
        type: String,
    },
    geohash: {
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});
UserSchema.index({ location: "2dsphere" });
// export default model<IUser>("User", UserSchema);
export default model("User", UserSchema);
//# sourceMappingURL=User.js.map