import type { Request, Response } from "express";
import { storage } from "../storage";
import {
  CreateReservation,
  PaymentMethod,
  ReservationStatus,
  GuestGender,
  type Occupant,
  UpdateReservation,
} from "../services/cloudbeds/api/types/reservation.types";
import {
  postReservation,
  putReservation,
} from "../services/cloudbeds/api/endpoints/reservation.api";
import { createPaymentIntent } from "server/services/airwallex/api/endpoints/payments.endpoints";
import { InsertReservation } from "@shared/schema";
import { getRoomTypeByID } from "server/services/cloudbeds/api/endpoints";
import { v4 as uuid } from "uuid";

interface BookingItem {
  id: string;
  roomTypeID: string;
  roomRateID: string;
  quantity: number;
  guests: number;
  isPrivate: boolean;
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  gender: GuestGender;
  phoneNumber: string;
  phoneCountry: string;
  zipCode: string;
  dateOfBirth: string;
  country: string;
}

interface ReservationData {
  propertyID: string;
  guestInfo: GuestInfo;
  checkInDate: string;
  checkOutDate: string;
  bookingItems: BookingItem[];
  totalItems: number;
}

export async function randomPayIntent(req: any, res: Response) {
  const paymentIntentData = {
    amount: 123.45,
    currency: "AUD",
    merchant_order_id: uuid(),
    request_id: `res_${uuid()}`,
    descriptor: "Reservation for Azzurro",
    return_url: `${process.env.FRONTEND_BASE_URL}/booking-confirmation`,
  };

  const paymentIntent = await createPaymentIntent(paymentIntentData);
  res.status(201).json({
    success: true,
    message: "Reservation created successfully",
    paymentIntent,
  });
}

export async function createReservation(req: any, res: Response) {
  try {
    const reservationData: ReservationData = req.body;

    // Validate required fields
    if (
      !reservationData.guestInfo ||
      !reservationData.bookingItems ||
      reservationData.bookingItems.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required reservation data",
      });
    }

    // Validate date of birth is 18+
    const eighteenYearsBack = new Date();
    eighteenYearsBack.setFullYear(eighteenYearsBack.getFullYear() - 18);
    if (new Date(reservationData.guestInfo.dateOfBirth) > eighteenYearsBack) {
      return res.status(400).json({
        success: false,
        message:
          "Age restriction: You must be at least 18 years old to book a reservation.",
      });
    }

    const adults: Occupant[] = [];
    reservationData.bookingItems.map((item) => {
      for (let i = 0; i < item.quantity; i++) {
        adults.push({
          roomTypeID: item.roomTypeID,
          quantity: item.guests ?? 1,
        });
      }
    });
    const children: Occupant[] = reservationData.bookingItems.map((item) => ({
      roomTypeID: item.roomTypeID,
      quantity: 0,
    }));

    const newReservation: CreateReservation = {
      propertyID: reservationData.propertyID,
      startDate: reservationData.checkInDate,
      endDate: reservationData.checkOutDate,
      guestFirstName: reservationData.guestInfo.firstName,
      guestLastName: reservationData.guestInfo.lastName,
      guestEmail: reservationData.guestInfo.email,
      guestPhone: reservationData.guestInfo.phoneNumber,
      guestCountry: reservationData.guestInfo.country,
      guestGender: reservationData.guestInfo.gender,
      guestZip: reservationData.guestInfo.zipCode,
      rooms: reservationData.bookingItems.map((item) => ({
        roomTypeID: item.roomTypeID,
        roomRateID: item.roomRateID,
        quantity: item.quantity,
      })),
      adults,
      children,
      paymentMethod: PaymentMethod.CREDIT,
    };

    const reservationResult = await postReservation(newReservation);
    if (!reservationResult.success) {
      return res.status(400).json(reservationResult);
    }

    // Update reservation status to not-confirmed
    // const updateReservationData: UpdateReservation = {
    //   propertyID: reservationData.propertyID,
    //   reservationID: reservationResult.reservationID,
    //   status: ReservationStatus.NOT_CONFIRMED
    // };

    // const reservationUpdateResult = await putReservation(updateReservationData);
    // if (!reservationUpdateResult.success) {
    //   return res.status(400).json(reservationUpdateResult);
    // }

    const paymentIntentData = {
      amount: 80.59,
      currency: "AUD",
      merchant_order_id: reservationResult.reservationID,
      request_id: `res_${reservationResult.reservationID}`,
      descriptor: "Reservation for Azzurro",
      return_url: `${process.env.FRONTEND_BASE_URL}/booking-confirmation`,
    };

    const paymentIntent = await createPaymentIntent(paymentIntentData);

    const reservation: InsertReservation = {
      userId: req.user?.claims?.sub || null,
      reservationId: reservationResult.reservationID,
      propertyID: reservationData.propertyID,
      guestId: reservationResult.guestID,
      status: reservationResult.status,
      guestFirstName: reservationData.guestInfo.firstName,
      guestLastName: reservationData.guestInfo.lastName,
      guestEmail: reservationData.guestInfo.email,
      guestGender: reservationData.guestInfo.gender,
      startDate: reservationData.checkInDate,
      endDate: reservationData.checkOutDate,
      grandTotal: reservationResult.grandTotal.toString(),
      currency: paymentIntent.currency,
      roomDetails: reservationData.bookingItems,
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status,
    };
    // Save reservation data to storage
    await storage.createReservation(reservation);

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: reservationResult,
      paymentIntent,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create reservation",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getUserReservations(req: any, res: Response) {
  try {
    const userId = req.user?.claims?.sub;
    const reservations = await storage.getUserReservations(userId);
    reservations.forEach((reservation) => {
      reservation.roomDetails = JSON.parse(reservation.roomDetails as string);
    });
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
}

export async function getReservation(req: any, res: Response) {
  try {
    const userId = req.user?.claims?.sub;
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Reservation ID is required" });
    console.log(id);
    const reservation = await storage.getReservationByExternalId(id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    res.json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ message: "Failed to fetch reservation details" });
  }
}
