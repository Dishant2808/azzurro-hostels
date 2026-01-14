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
  roomType?: string;
  bedType?: string;
  bathroomType?: string;
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
  roomDefautRate: number;
  ratePlanNamePublic: string;
  ratePlanNamePrivate: string;
  adultsExtraCharge: Record<string, number>;
  childrenExtraCharge: Record<string, number>;
}

