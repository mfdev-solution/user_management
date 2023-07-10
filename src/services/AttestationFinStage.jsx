import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/attesttion-fin-stage";

export const getAllAttestationFinStage = async () => {
   try {
      return await Axios.get(`${baseUrl}`);
   } catch (error) {
      return error;
   }
};

export const addAttestationFinStage = async (attestation) => {
   try {
      return await Axios.post(`${baseUrl}`, attestation);
   } catch (error) {
      return error;
   }
};
