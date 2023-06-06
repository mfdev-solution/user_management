import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/contrats";
const baseUrlAP = "http://localhost:8080/api/attestations";

export const AttestationStageService = () => {
   return <div>AttestationStageService</div>;
};

export const ajouterAttestationStage = async (values) => {
   try {
    return await Axios.post(`${baseUrl}`,values)
   } catch (error) {}
};


export const downloadAttestationPresenceService = async (value) => {
  try {
     return await Axios.post(`${baseUrlAP}/download/`,value, {
        responseType: "blob",
        
     });
  } catch (error) {
     return error;
  }
};