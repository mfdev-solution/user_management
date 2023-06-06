import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/stagiaires";
export const AdminService = () => {};
export const addIntern = async (intern) => {
   try {
      const res = await Axios.post(`${baseUrl}`, intern);
      return res;
   } catch (err) {
      return err;
   }
};
