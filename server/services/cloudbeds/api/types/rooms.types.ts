export interface Room {
  roomID: string,
  roomName: string,
  dormRoomName: string,
  roomDescription: string,
  maxGuests: number,
  isPrivate: boolean,
  isVirtual: boolean,
  roomBlocked: boolean,
  roomTypeID: string,
  roomTypeName: string,
  roomTypeNameShort: string,
}

export interface UnassignedRoomsResponse {
  success: boolean;
  data: {
    propertyID: string;
    rooms: Room[];
  }[];
  count: number;
  total: number;
}