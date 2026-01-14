import { Request, Response } from "express";
import {
  getRoomTypeRatePlans,
} from "../services/cloudbeds/api/endpoints/rate.api";
import {
  getAvailableRoomTypes,
  getRoomTypes
} from "../services/cloudbeds/api/endpoints/rooms.api";
import { getPropertiesMap } from "../utils/properties.spec";

export const getRooms = async (req: Request, res: Response) => {
  try {
    let propertyIds = ["311134", "311272"];
    let roomTypesList: any[] = [];
    for (let propertyId of propertyIds) {
      const result = await getRoomTypes(propertyId);
      if (result.success) roomTypesList.push(...result.data);
      else return res.status(400).json(result);
    }
    return res.status(200).json({ success: true, data: roomTypesList });
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    res.status(500).json({ message: "Failed to fetch hotel details" });
  }
};

export const getAvailableRooms = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    if (!query.startDate || !query.endDate)
      return res.status(400).json({ message: "Missing startDate or endDate" });

    const { startDate, endDate, adults, children, rooms } = query;
    const location = query.location as string;
    console.log(location);
    let propertyIds = location ? location.split(",") : ["311134", "311272", "317399"];
    let roomTypesList: any[] = [];
    const allProperties = getPropertiesMap();
    for (let propertyId of propertyIds) {
      const availableRoomTypesPromise = getAvailableRoomTypes(
        propertyId,
        startDate as string,
        endDate as string,
        adults as string,
        children as string,
        rooms as string,
      );

      const roomTypesPromise = getRoomTypes(propertyId);
     
      const result = await availableRoomTypesPromise;
      if (result.success && !result.data.length) continue;

      if (result.success) {
        let propertyRooms = result?.data[0].propertyRooms;

        const defaultRates = propertyRooms.reduce(
          (acc: Record<string, number>, room) => {
            if (room.ratePlanNamePrivate == "default")
              acc[room.roomTypeID] = room.roomRate;
            return acc;
          },
          {},
        );

        // propertyRooms = propertyRooms.filter(
        //   (room) =>
        //     room.ratePlanNamePrivate == "Non-refundable  Direct Booking",
        // );


        const roomTypes = await roomTypesPromise;
        if (roomTypes.success && !roomTypes.data.length) continue;
        if (!roomTypes.success) continue;
        
        propertyRooms.forEach((room) => {
          const roomType = roomTypes.data.find(
            (roomType) => roomType.roomTypeID == room.roomTypeID,
          );
          if (roomType) {
            room.isPrivate = roomType.isPrivate;
          }
          room.propertyID = propertyId;
          room.roomDefautRate = defaultRates[room.roomTypeID] ?? (room.roomRate + 10);
          roomTypesList.push(room);
        });

        
        
      } else return res.status(400).json(result);
    }

    return res.status(200).json({ success: true, data: roomTypesList });
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    res.status(500).json({ message: "Failed to fetch hotel details" });
  }
};

export const getRoomTypeRate = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    if (!query.startDate || !query.endDate)
      return res.status(400).json({ message: "Missing startDate or endDate" });

    const {roomTypeID, propertyID, startDate, endDate, adults, children } = query;
    const roomTypeRatePlansResponse = await getRoomTypeRatePlans(
      propertyID as string,
      roomTypeID as string,
      startDate as string,
      endDate as string,
      adults as string,
      children as string,
    );

    if(!roomTypeRatePlansResponse.success) return res.status(400).json(roomTypeRatePlansResponse);
    
    return res.status(200).json({ success: true, data: roomTypeRatePlansResponse.data });
  } catch (error) {
    console.error("Error fetching room rate details:", error);
    res.status(500).json({ message: "Failed to fetch room rate details" });
  }
}
