import Campus from "../models/Campus";

export const findCampusByUserLocation = async (userLocation) => {
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

export const findCampusById = async (campusId: string) => {
   try {
      const campus = await Campus.findById(campusId);
      if (!campus) {
         return false;
      }
      return campus;
   } catch (error) {
      console.error("Error findCampusById:", error);
      return false
   }
};
