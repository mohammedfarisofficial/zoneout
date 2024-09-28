import { Schema } from "mongoose";
const locationSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        coordinates: [Number],
    },
});
export default locationSchema;
//# sourceMappingURL=Location.js.map