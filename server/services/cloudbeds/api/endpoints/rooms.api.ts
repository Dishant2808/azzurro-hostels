import axiosInstance from "../axios.config.ts";
import { UnassignedRoomsResponse } from "../types/rooms.types.ts";
import {
  AvailableRoomTypesResponse,
  RoomTypesResponse,
} from "../types/roomTypes.types.ts";

export async function getRoomTypes(
  propertyID: String,
): Promise<RoomTypesResponse> {
  try {
    const res = await axiosInstance(propertyID).get<RoomTypesResponse>(
      "/getRoomTypes",
      {
        params: {
          propertyID,
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

export async function getRoomTypeByID(
  propertyID: String, roomTypeID: string
): Promise<RoomTypesResponse> {
  try {
    const res = await axiosInstance(propertyID).get<RoomTypesResponse>(
      "/getRoomTypes",
      {
        params: {
          propertyID,
          roomTypeID,
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

export async function getAvailableRoomTypes(
  propertyId: String,
  startDate: string,
  endDate: string,
  adults: string | number = 1,
  children: string | number = 0,
  rooms: string | number = 1,
): Promise<AvailableRoomTypesResponse> {
  try {
    const res = await axiosInstance(propertyId).get<AvailableRoomTypesResponse>(
      "/getAvailableRoomTypes",
      {
        params: {
          propertyID: propertyId,
          startDate: startDate,
          endDate: endDate,
          adults: adults,
          children: children,
          rooms: rooms,
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

export async function getUnassignedRooms(
  propertyId: String,
  startDate: string,
  endDate: string,
): Promise<UnassignedRoomsResponse> {
  try {
    const res = await axiosInstance(propertyId).get<UnassignedRoomsResponse>(
      "/getRooms",
      {
        params: {
          propertyID: propertyId,
          startDate: startDate,
          endDate: endDate,
          pageSize: 500,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}
