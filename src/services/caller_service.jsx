import axios from "axios";
import { getToken, isLoged ,logout} from "./auth_service";
const Axios = axios.create();

Axios.interceptors.request.use((request) => {
   if (isLoged()) {
      console.log("acceded");
      request.headers.Authorization = "Bearer " + getToken();
   }
   // console.log(request.headers.Authorization);
   return request;
});
Axios.interceptors.response.use(response => {
   return response
}, error => {
   if(error.response.status === 401){
       logout()
       window.location = '/auth/login'
   }else{
       return Promise.reject(error)
   }
})

export default Axios;
