import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/payment/";

export const getAllPayment = async () => {
   try {
      return await Axios.get(`${baseUrl}`);
   } catch (error) {
      return error;
   }
};
