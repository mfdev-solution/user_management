
let saveToken = (token) => {
   localStorage.setItem("token", token);
};
let logout = () => {
   // e.preventDefault()
//    console.log("checked");
   localStorage.removeItem("token");
};
let getToken = () =>{
    // console.log(lo);
    return localStorage.getItem("token");
}
let isLoged = () => {
   return !!localStorage.getItem("token");
};
export { saveToken, logout, isLoged ,getToken };
