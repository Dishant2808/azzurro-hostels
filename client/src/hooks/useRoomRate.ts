import { RoomTypeRate } from "@/api/rate.types";
import { useQuery } from "@tanstack/react-query";

export const useRoomRate = (
  propertyID: string,
  roomTypeID: string,
  startDate: string,
  endDate: string,
  adults: string | number = 1,
  children: string | number = 0,
) => {
  return useQuery({
    queryKey: ["roomRate", roomTypeID, startDate, endDate, adults, children],
    queryFn: async ():Promise<RoomTypeRate | null> => {
      const response = await fetch(
        `/api/roomTypeRate?propertyID=${propertyID}&roomTypeID=${roomTypeID}&startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log({ roomTypeRate: result.data });
      
      // Handle empty data array case
      if (!result.data || result.data.length === 0) {
        return null;
      }
      
      return getNonRefundableRate(result.data);
    },
  });
};

function getNonRefundableRate(roomRates: RoomTypeRate[]) : RoomTypeRate | null {
  // Handle empty array case
  if (!roomRates || roomRates.length === 0) {
    return null;
  }
  
  const nonRefundableRate = roomRates.find(
    (room: any) =>
      room.ratePlanNamePrivate === "Non-refundable  Direct Booking",
  );
  if (nonRefundableRate) return nonRefundableRate;
  return roomRates[0];
}
