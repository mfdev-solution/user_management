import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/managers/";

export const getAllStagiaireByIdManager = async (id) => {
   try {
      return await Axios.get(`${baseUrl}stagiaires-list/${id}`);
   } catch (error) {
      return error;
   }
};

export const getAllStagiaireByIdManagerAndStatEnProposition = async (id) => {
   try {
      return await Axios.get(`${baseUrl}proposition/${id}`);
   } catch (error) {
      return error;
   }
};
export const ajouterAttestationPresence = async (values) => {
   try {
      return await Axios.post(`${baseUrl}attestation-presence`, values);
   } catch (error) {
      return error;
   }
};
export const getAllAttestationByManager = async () =>{
    try {
        return await Axios.get(`${baseUrl}attestation-presence`)
    } catch (error) {
        return error;
    }
}
