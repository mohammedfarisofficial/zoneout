import Campus from "../models/Campus";

export const findCampus = async (userLocation) => {
   try {
      const campus = await Campus.findOne({
         polygon: {
            $geoIntersects: {
               $geometry: userLocation,
            },
         },
      });

      if (campus) {
         return campus;
      } else {
         return false;
      }
   } catch (error) {
      console.error("Error finding campus:", error);
   }
};
