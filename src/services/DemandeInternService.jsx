import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/demande-externe";
export const AttestationPresence = () => {
   return <div>AttestationPresence</div>;
};

export const getAllDemandesInternesByManager = async () => {
   try {
      return await Axios.get(`${baseUrl}/manager`);
   } catch (error) {
      return error;
   }
};
export const AddDemandeExterne = async (values) => {
   try {
      return await Axios.post(baseUrl, values);
   } catch (error) {
      return error;
   }
};
export const getAllDemandesInternes = async () => {
   try {
      return await Axios.get(baseUrl);
   } catch (error) {
      return error;
   }
};
export const updateDemandeInterne = async (values) => {
   try {
      return await Axios.put(`${baseUrl}/${values.id}`, values);
   } catch (error) {
      return error;
   }
};
