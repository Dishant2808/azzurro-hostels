import { Reservation } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

const fetchReservationDetails = async (reservationId: string): Promise<Reservation> => {
    const response = await fetch(`/api/reservation-details/${reservationId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log({result})
    return result;
  }

export const useReservation = (reservationId: string | null) => {
  return useQuery<Reservation, Error>({
    queryKey: ["reservationDetails", reservationId],
    queryFn: ()=>fetchReservationDetails(reservationId || ""),
    enabled: !!reservationId,
    refetchInterval: (query) => {
      // Stop polling if payment is successful, otherwise poll every 5 seconds
      const data = query.state.data;
      return data?.paymentStatus === "SUCCEEDED" ? false : 5000;
    },
    refetchIntervalInBackground: false // Stop refetching when tab is not active
  })
}