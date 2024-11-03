import { Schema, model } from "mongoose";

const EventSchema: Schema = new Schema({
   created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   geohash: {
      type: String,
   },
   polygon: {
      type: {
         type: String,
         enum: ["Polygon"],
      },
      coordinates: {
         type: [[[Number, Number]]],
      },
   },
});

EventSchema.index({ polygon: "2dsphere" });

// export default model<IUser>("User", UserSchema);
export default model("Event", EventSchema);
