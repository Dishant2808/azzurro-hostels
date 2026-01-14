import axiosInstance from "../axios.config.ts";

export async function getHotelDetails(propertyId: String) {
  try {
    const res = await axiosInstance(propertyId).get("/getHotelDetails", {
      params: {
        propertyID: propertyId,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    throw error;
  }
}
