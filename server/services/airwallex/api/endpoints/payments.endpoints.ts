import axios from "../axios.config"

export const createPaymentIntent = async (intentData: any) =>{
  try{
    const result = await axios.post("/pa/payment_intents/create", intentData);
    return result.data;
  }catch(error){
    console.error("Error creating payment intent:", error);
    throw error;
  }
}