import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/test";
const baseUrl2 = "http://localhost:8080/api/stagiaires";

export const uploadExcelFile = async (file) => {
   try {
      return await Axios.post(baseUrl2 + "/upload/validation-file", file);
   } catch (error) {
      return error;
   }
};
