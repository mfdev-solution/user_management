import axios from "axios";
import { getToken, isLoged } from "./auth_service";
const Axios = axios.create();

Axios.interceptors.request.use((request) => {
   if (isLoged()) {
      console.log("acceded");
      request.headers.Authorization = "Bearer " + getToken();
   }
   console.log(request.headers.Authorization);
   return request;
});

export default Axios;
