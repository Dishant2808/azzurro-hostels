export interface CreateReservation {
  propertyID: string;
  sourceID?: string;
  thirdPartyIdentifier?: string;

  startDate: string;
  endDate: string;

  guestFirstName: string;
  guestLastName: string;
  guestGender?: GuestGender;
  guestCountry: string; // ISO 2-letter code
  guestZip: string;
  guestEmail: string;
  guestPhone?: string;
  guestRequirements?: GuestRequirement[];

  estimatedArrivalTime?: string;

  rooms: Room[];
  adults: Occupant[];
  children: Occupant[];

  paymentMethod: PaymentMethod;
  cardToken?: string;
  paymentAuthorizationCode?: string;
  customFields?: CustomField[];

  promoCode?: string;
  allotmentBlockCode?: string;
  groupCode?: string;

  dateCreated?: string; // date-time ISO string
  sendEmailConfirmation?: boolean;
}

export interface UpdateReservation {
  reservationID: string;
  propertyID: string;
  status?: ReservationStatus;
  estimatedArrivalTime?: string;
}


// ---------- Response Interfaces ----------

export interface UpdateReservationResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface ReservationResponse {
  success: boolean;
  reservationID: string;
  status: ReservationStatus;

  guestID: string;
  guestFirstName: string;
  guestLastName: string;
  guestGender?: GuestGender;
  guestEmail: string;

  startDate: string;
  endDate: string;
  dateCreated: string; // date-time ISO string

  grandTotal: number;

  unassigned: UnassignedRoom[];

  message?: string; // only present if success = false
}

export interface UnassignedRoom {
  subReservationID: string;
  roomTypeName: string;
  roomTypeID: string;
  adults: number;
  children: number;
  dailyRates: DailyRate[];
}

export interface DailyRate {
  date: Date;
  rate: number;
  roomTotal: number;
}

// ---------- Sub-objects ----------

export interface Room {
  roomTypeID: string;
  quantity: number;
  roomID?: string;
  roomRateID?: string;
}

export interface Occupant {
  roomTypeID: string;
  quantity: number;
  roomID?: string;
}

export interface GuestRequirement {
  [key: string]: any; // Adjust based on actual requirement structure
}

export interface CustomField {
  [key: string]: any; // Adjust based on actual custom field structure
}

// ---------- Enums ----------

export enum PaymentMethod {
  CASH = "cash",
  CREDIT = "credit",
  EBANKING = "ebanking",
  PAY_PAL = "pay_pal",
}

export enum GuestGender {
  M = "M",
  F = "F",
  "N/A" = "N/A",
}

 export enum ReservationStatus {
  CONFIRMED = "confirmed",
  NOT_CONFIRMED = "not_confirmed",
  CANCELLED = "canceled",
  CHECKED_IN = "checked_in",
  CHECKED_OUT = "checked_out",
  NO_SHOW = "no_show",
}