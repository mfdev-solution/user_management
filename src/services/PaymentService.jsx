import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/payment/";

export const getAllPayment = async () => {
   try {
      return await Axios.get(`${baseUrl}`);
   } catch (error) {
      return error;
   }
};
export const getAllPayementByEtat = async (etat) => {
   try {
      return await Axios.get(`${baseUrl}etat/${etat}`);
   } catch (error) {
      return error;
   }
};
export const updatePayment = async (payment) => {
   try {
      return await Axios.put(`${baseUrl}${payment.id}`, payment);
   } catch (error) {
      return error;
   }
};
