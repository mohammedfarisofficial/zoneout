import { Schema, Document, model } from "mongoose";

export interface CampusDocument extends Document {
   name: string;
   polygon: {
      type: "Polygon" | "MultiPolygon";
      coordinates: number[][][] | number[][][][];
   };
   alt_name?: string;
   amenity?: string;
   name_ml?: string;
   type?: string;
   website?: string;
   wikidata?: string;
   wikipedia?: string;
   addr?: {
      city?: string;
      street?: string;
      housenumber?: string;
      postcode?: string;
   };
   contact?: {
      email?: string;
      facebook?: string;
      website?: string;
   };
   operator?: string;
   operator_type?: string;
   internet_access?: string;
   building?: string;
   building_levels?: number;
   wheelchair?: string;
   relations?: Array<{
      role: string;
      rel: number;
      reltags: {
         amenity?: string;
         name?: string;
         type?: string;
      };
   }>;
}

const CampusSchema: Schema<CampusDocument> = new Schema({
   name: {
      type: String,
      required: true,
   },
   polygon: {
      type: {
         type: String,
         enum: ["Polygon", "MultiPolygon"],
         required: true,
      },
      coordinates: {
         type: Schema.Types.Mixed,
         required: true,
      },
   },
   alt_name: String,
   amenity: String,
   name_ml: String,
   type: String,
   website: String,
   wikidata: String,
   wikipedia: String,
   addr: {
      city: String,
      street: String,
      housenumber: String,
      postcode: String,
   },
   contact: {
      email: String,
      facebook: String,
      website: String,
   },
   operator: String,
   operator_type: String,
   internet_access: String,
   building: String,
   building_levels: Number,
   wheelchair: String,
   relations: [
      {
         role: String,
         rel: Number,
         reltags: {
            amenity: String,
            name: String,
            type: String,
         },
      },
   ],
});

// Pre-save hook to convert `reltags` to a string
// CampusSchema.pre("save", function (next) {
//    if (this.relations) {
//       this.relations = this.relations.map(relation => ({
//          ...relation,
//          reltags: JSON.stringify(relation.reltags)  // Convert object to string
//       }));
//    }
//    next();
// });

CampusSchema.index({ polygon: "2dsphere" });

export default model<CampusDocument>("Campus", CampusSchema);
