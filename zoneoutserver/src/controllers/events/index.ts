import { Request, Response } from "express";
import Event from "../../models/Event";
import { geohashEncode, geohashNeighbors } from "../../utils/geohash";
import User from "../../models/User";

const testCoordinates = [
   [
      [76.148, 10.564],
      [76.149, 10.564],
      [76.149, 10.565],
      [76.148, 10.565],
      [76.148, 10.564],
   ],
];

export const createEvent = async (req: Request, res: Response) => {
   try {
      const { created_by, polygon, coords } = req.body;
      const { latitude, longitude } = coords;
      const hash = await geohashEncode(coords[1], coords[0])
      // Log the received coordinates for debugging
      console.log("Received polygon coordinates:", polygon.geometry.coordinates);

      const newEvent = new Event({
         geohash: hash,
         created_by: created_by,
         polygon: {
            type: "Polygon",
            coordinates: testCoordinates,
         },
      });

      const savedEvent = await newEvent.save();
      const neighbors = await geohashNeighbors(hash.toString())

      const nearbyUsers = await User.find({
        geohash: { $in: [hash, ...neighbors] },
      });
      // Send Notification 
      console.log(nearbyUsers)
      res.json(savedEvent);
   } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Failed to create event" });
   }
};
