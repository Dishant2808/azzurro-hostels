import qs from "qs";
import axiosInstance from "../axios.config.ts";
import { CreatePayment, PaymentResponse } from "../types/payment.types.ts";

export async function postPayment(
  data: CreatePayment,
): Promise<PaymentResponse> {
  try {
    const res = await axiosInstance(data.propertyID).post<PaymentResponse>(
      "/postPayment",
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw error;
  }
}
