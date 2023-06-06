import axios from "axios";
const Axios = axios.create();

Axios.interceptors.request.use((request) => {
  //  if (isLoged()) {
      // console.log("acceded");
      request.headers.Authorization = "Bearer " + localStorage.getItem("user");
  //  }
   // console.log(request.headers.Authorization);
   return request;
});

export default Axios;
