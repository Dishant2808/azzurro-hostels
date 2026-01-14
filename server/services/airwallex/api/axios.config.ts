import axios from "axios";

const airwallexApi = axios.create({
  baseURL: process.env.AIRWALLEX_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

airwallexApi.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, err => {
  return Promise.reject(err);
})

async function getToken(){
  try {
    const result = await axios.post(`${process.env.AIRWALLEX_BASE_URL}/authentication/login`, null, {
      headers: {
        "x-client-id": process.env.AIRWALLEX_CLIENT_ID,
        "x-api-key": process.env.AIRWALLEX_API_KEY,
      }
    });
    return result.data.token || result.data;
  } catch (error) {
    console.error('Failed to get Airwallex token:', error);
    throw error;
  }
}

export default airwallexApi;