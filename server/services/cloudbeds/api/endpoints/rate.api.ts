import { RoomTypeRatePlansResponse } from "../types/rate.types";
import axiosInstance from "../axios.config.ts";

export async function getRoomTypeRatePlans(
  propertyID: string,
  roomTypeID: string,
  startDate: string,
  endDate: string,
  adults: string | number = 1,
  children: string | number = 0,
): Promise<RoomTypeRatePlansResponse> {
  try {
    const res = await axiosInstance(propertyID).get<RoomTypeRatePlansResponse>(
      "/getRatePlans",
      {
        params: {
          propertyID: propertyID,
          roomTypeID: roomTypeID,
          startDate: startDate,
          endDate: endDate,
          adults: adults,
          children: children,
          pageSize: 100,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}