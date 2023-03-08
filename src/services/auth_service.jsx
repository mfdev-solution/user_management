let saveToken = (token) => {
   localStorage.setItem("token", token);
};
let logout = () => {
   // e.preventDefault()x
//    console.log("checked");
   localStorage.removeItem("token");
};

let isLoged = () => {
   return !!localStorage.getItem("token");
};
export { saveToken, logout, isLoged };
