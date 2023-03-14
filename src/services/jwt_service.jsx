import jwt_decode from 'jwt-decode';
import Axios from './caller_service';
const baseUrl = "http://localhost:8080/userapi/users";

export const  decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
export   const loadUserByEmail = async (token) => {
    const tokenDeconded = decodeToken(token);
    try {
        const response = await Axios.post(`${baseUrl}/email`, { email: tokenDeconded.sub });
        return response.data;
    } catch (err) {
        return err;
    }
    // return user;
  }
