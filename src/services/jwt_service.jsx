import jwt_decode from "jwt-decode";
import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api";

export const decodeToken = (token) => {
   try {
      const decoded = jwt_decode(token);
      return decoded;
   } catch (error) {
      console.log(token);
      console.log(error);
      return null;
   }
};
export const loadUserByEmail = async (token) => {
   // console.log("email loaded");
   const login = decodeToken(token).sub;
   try {
      const response = await Axios.get(`${baseUrl}/admin/users/${login}`);
      return response;
   } catch (err) {
      return err;
   }
};
export const loadManagerByLogin = async (token) => {
   const login = decodeToken(token).sub;
   try {
      const response = await Axios.get(`${baseUrl}/managers/${login}`);
      return response;
   } catch (err) {
      return err;
   }
};
export const loadGwteByLogin = async (token) => {
   const login = decodeToken(token).sub;
   try {
      return await Axios.get(`${baseUrl}/gwtes/${login}`);
   } catch (err) {
      return err;
   }
};
// export const loadAllUsers = async () =>{
//   try {
//     const response = await Axios.get(`${baseUrl}`);
//         return response.data;
//   } catch (error) {

//   }
// }
