import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/demande-externe";
export const AttestationPresence = () => {
   return <div>AttestationPresence</div>;
};
export const AddDemandeExterne = async (values) => {
   try {
      return await Axios.post(baseUrl, values);
   } catch (error) {
      return error;
   }
};
