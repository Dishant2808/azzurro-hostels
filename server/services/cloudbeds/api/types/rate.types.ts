export interface RoomTypeRatePlan {
  rateID: string;
  roomRate: number;
  totalRate: number;
  roomsAvailable: number;
  roomTypeID: string;
  roomTypeName: string;
  isDerived: boolean;

  // Optional fields for derived / plan-based rates
  ratePlanID?: string;
  ratePlanNamePublic?: string;
  ratePlanNamePrivate?: string;
  promoCode?: string;
  derivedType?: "percentage" | "fixed" | string;
  derivedValue?: number;
  baseRate?: number;
  ratePlanAddOns?: any[]; // refine if you know add-ons structure
};

export interface RoomTypeRatePlansResponse {
  success: boolean;
  data: RoomTypeRatePlan[];
}

