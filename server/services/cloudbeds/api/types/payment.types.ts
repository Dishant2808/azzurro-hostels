export interface CreatePayment {
  propertyID: string;
  reservationID: string;
  type: string;
  amount: number;
  cardType: string | null;
  description: string | null;
}

// ---------- Response Interfaces ----------

export interface PaymentResponse {
  success: boolean;
  paymentID: string;
  transactionID: string | null;
  message: string | null;
}
