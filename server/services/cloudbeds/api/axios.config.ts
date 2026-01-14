import axios from "axios";

const axiosInstance = (propertyId: String) => {
  return axios.create({
    baseURL: process.env.CLOUDBEDS_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env[`PROPERTY_${propertyId}_API_KEY`],
    },
  });
};

export default axiosInstance;
