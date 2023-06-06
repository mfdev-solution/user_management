import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/contrats";

export const getAllContracts = async () => {
   try {
      return await Axios.get(baseUrl);
   } catch (error) {
      return error;
   }
};

export const generateContract = async (contrat) => {
   try {
      return await Axios.post(`${baseUrl}/generate`, contrat);
   } catch (error) {
      return error;
   }
};
export const downloadOneContractService = async (id) => {
   try {
      return await Axios.get(`${baseUrl}/download/${id}`, {
         responseType: "blob",
      });
   } catch (error) {
      return error;
   }
};
export const downloadContractService = async (id) => {
   try {
      return await Axios.get(`${baseUrl}/generate-v1/${id}`, {
         responseType: "blob",
      });
   } catch (error) {
      return error;
   }
};

export const getAllPropositionStageGwte = async () => {
   try {
      return await Axios.get(`${baseUrl}/suivi-demande-interne`);
   } catch (error) {
      return error;
   }
};
export const cancelPropostionStage = async (id, contrat) => {
   try {
      return await Axios.put(`${baseUrl}/${id}`, contrat);
   } catch (error) {
      return error;
   }
   
};
