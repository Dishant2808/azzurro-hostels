import { ReactNode } from "react";

export interface RoomTypesResponse {
  success: boolean;
  data: RoomType[];
  count: number;
  total: number;
}

export interface RoomType {
  roomTypeID: string;
  propertyID: string;
  roomTypeName: string;
  roomTypeNameShort: string;
  roomTypeDescription: string; // HTML string
  isPrivate: boolean;
  maxGuests: number;
  adultsIncluded: number;
  childrenIncluded: number;
  roomTypePhotos: string[];
  roomTypeFeatures: Record<string, string>;
  roomsAvailable: number;
  roomTypeUnits: number;
}

export interface RoomTypeProcessed extends RoomType {
  roomTypeDescriptionText: string;
  roomTypeDescriptionJSX: ReactNode;
}

export interface AvailableRoomTypesResponse {
  success: boolean;
  data: {
    propertyID: string;
    propertyCurrency: {
      currencyCode: string;
      currencySymbol: string;
      currencyPosition: string;
    };
    propertyRooms: AvailableRoomType[];
  }[];
  roomCount: number;
  count: number;
  total: number;
}

export interface AvailableRoomType
  extends Omit<RoomType, "roomTypePhotos" | "roomTypeFeatures"> {
  roomTypePhotos: {
    thumb: string;
    image: string;
  }[];
  roomTypeFeatures: string[];
  roomRateID: string;
  roomRate: number;
  roomDefautRate?: number;
  ratePlanNamePublic: string;
  ratePlanNamePrivate: string;
  adultsExtraCharge: Record<string, number>;
  childrenExtraCharge: Record<string, number>;
}
