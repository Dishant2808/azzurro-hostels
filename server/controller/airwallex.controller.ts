import { Request, Response } from "express";
import { storage } from "../storage";
import { CreatePayment } from "server/services/cloudbeds/api/types/payment.types";
import { postPayment } from "server/services/cloudbeds/api/endpoints/payment.api";
import {
  ReservationStatus,
  UpdateReservation,
} from "server/services/cloudbeds/api/types/reservation.types";
import { putReservation } from "server/services/cloudbeds/api/endpoints/reservation.api";
import { REWARDS_CONFIG, calculateBookingPoints } from "@shared/config/rewards";

interface AirwallexWebhookPayload {}

enum EventType {
  PAYMENT_INTENT_CREATED = "payment_intent.created",
  PAYMENT_INTENT_UPDATED = "payment_intent.updated",
  PAYMENT_INTENT_SUCCEEDED = "payment_intent.succeeded",
  PAYMENT_INTENT_REQUIRES_CUSTOMER_ACTION = "payment_intent.requires_customer_action",
  PAYMENT_INTENT_REQUIRES_CAPTURE = "payment_intent.requires_capture",
  PAYMENT_INTENT_REQUIRES_PAYMENT_METHOD = "payment_intent.requires_payment_method",
  PAYMENT_INTENT_PENDING = "payment_intent.pending",
  PAYMENT_INTENT_CANCELLED = "payment_intent.cancelled",
}

enum PaymentStatus {
  SUCCESSFULL = "SUCCESSFULL",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  CANCELLED = "CANCELLED",
}

export const webhookListener = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const eventName: EventType | string = data.name;
    const intentId = data.data.object.id;
    const { request_id, merchant_order_id } = data.data.object;
    const status = data.data.object.status;
    console.log(data);

    const reservation =
      await storage.getReservationByExternalId(merchant_order_id);

    if (!reservation) throw Error("Reservation not found");
    if (reservation.paymentIntentId !== intentId)
      throw Error("Payment intent ID does not match");

    switch (eventName) {
      case EventType.PAYMENT_INTENT_CREATED:
        reservation.paymentStatus = PaymentStatus.PENDING;
        break;
      case EventType.PAYMENT_INTENT_UPDATED:
        reservation.paymentStatus = PaymentStatus.PENDING;
        break;
      case EventType.PAYMENT_INTENT_SUCCEEDED:
        reservation.paymentStatus = PaymentStatus.SUCCESSFULL;
        break;
      case EventType.PAYMENT_INTENT_REQUIRES_CUSTOMER_ACTION:
        reservation.paymentStatus = PaymentStatus.PROCESSING;
        break;
      case EventType.PAYMENT_INTENT_REQUIRES_CAPTURE:
        reservation.paymentStatus = PaymentStatus.PROCESSING;
        break;
      case EventType.PAYMENT_INTENT_PENDING:
        reservation.paymentStatus = PaymentStatus.PENDING;
        break;
      case EventType.PAYMENT_INTENT_CANCELLED:
        reservation.paymentStatus = PaymentStatus.CANCELLED;
        break;
      default:
        console.log("Webhook Received: ", eventName);
        console.log("Intent ID: ", intentId);
    }

    if (
      status === "SUCCEEDED" &&
      eventName == EventType.PAYMENT_INTENT_SUCCEEDED
    ) {
      const paymentData: CreatePayment = {
        propertyID: reservation.propertyID,
        reservationID: reservation.reservationId,
        type: "thirdparty",
        amount: data.data.object.amount,
        cardType: null,
        description: null,
      };

      const paymentMethod =
        data.data.object.latest_payment_attempt.payment_method;
      switch (paymentMethod.type) {
        case "card":
          paymentData.type = "credit";
          paymentData.cardType = paymentMethod.card.brand;
          break;
        case "googlepay":
          paymentData.type = "thirdparty";
          break;
        case "applepay":
          paymentData.type = "thirdparty";
          break;
        default:
          paymentData.type = "thirdparty";
      }

      const paymentResponse = await postPayment(paymentData);
      if (!paymentResponse.success)
        throw Error("Cloudbeds: Payment creation failed");
      reservation.paymentID = paymentResponse.paymentID;

      // Award points for successful booking (with idempotency check)
      if (reservation.userId && !reservation.pointsAwarded) {
        try {
          const bookingValue = parseFloat(reservation.grandTotal);
          
          // Check if this is user's first booking (for potential bonus)
          const userReservations = await storage.getUserReservations(reservation.userId);
          const isFirstBooking = userReservations.length === 1; // This booking would be their first
          
          const pointsToAward = calculateBookingPoints(bookingValue, isFirstBooking, false);
          
          await storage.awardPoints(reservation.userId, pointsToAward);
          await storage.markPointsAwarded(reservation.id);
          console.log(`Awarded ${pointsToAward} points to user ${reservation.userId} for booking ${reservation.reservationId}`);
        } catch (error) {
          console.error("Error awarding points:", error);
          // Don't throw error here - payment was successful, points are secondary
        }
      } else if (reservation.pointsAwarded) {
        console.log(`Points already awarded for reservation ${reservation.reservationId}`);
      }

      // Update reservation status to confirmed
      // const updateReservationData: UpdateReservation = {
      //   propertyID: reservation.propertyID,
      //   reservationID: reservation.reservationId,
      //   status: ReservationStatus.CONFIRMED
      // };

      // const reservationUpdateResult = await putReservation(updateReservationData);
      // if (!reservationUpdateResult.success) {
      //   throw Error("Cloudbeds: Payment creation failed");
      // }
    }

    await storage.updatePaymentStatus(
      reservation.id,
      reservation.paymentStatus || "",
      intentId,
    );

    res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    res.status(200).json({ message: "Webhook received but failed to process" });
    console.error("Error processing webhook:", error);
  }
};
