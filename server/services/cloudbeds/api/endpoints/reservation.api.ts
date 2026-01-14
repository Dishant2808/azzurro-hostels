import qs from "qs";
import axiosInstance from "../axios.config.ts";
import { CreateReservation, ReservationResponse, ReservationStatus, UpdateReservation, UpdateReservationResponse } from "../types/reservation.types.ts";

export async function postReservation(
  data: CreateReservation,
): Promise<ReservationResponse> {
  try {
    const res = await axiosInstance(data.propertyID).post<ReservationResponse>(
      "/postReservation",
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}

export async function putReservation(
  data: UpdateReservation,
): Promise<UpdateReservationResponse> {
  try {
    const res = await axiosInstance(data.propertyID).put<UpdateReservationResponse>(
      "/putReservation",
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}