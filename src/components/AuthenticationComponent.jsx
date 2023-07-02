import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { saveToken, isLoged, decodeToken } from "../services";
import {
   loadUserByEmail,
   loadManagerByLogin,
   loadGwteByLogin,
} from "../services";
import logogSonatel from "../assets/images/LOGO_SONATEL.png";
import { login } from "../services/User.Service";

// import useMessage from "antd/es/message/useMessage";
import { Modal, message } from "antd";

export const AuthenticationComponent = ({ opened }) => {
   const [messageForm, setMessage] = useState();
   const [credentials, setCredentials] = useState({
      username: "",
      password: "",
   });
   const [open, setopen] = useState(opened);
   //    const navigate = useNavigate();
   const onChange = (e) => {
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value,
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (credentials.username === "" || credentials.password === "") {
         message.error("Tous les champs sont requis ");
         return;
      }
      login(credentials.username, credentials.password)
         .then((res) => {
            saveToken(res.data.id_token);
            var decodedToken = decodeToken(res.data.id_token).auth;
            if (decodedToken.includes("ROLE_GWTE")) {
               loadGwteByLogin(res.data.id_token)
                  .then((response) => {
                     console.log(response.data);
                     //  return navigate("/gwte");
                     window.location.replace("/gwte");
                     //  return <Navigate to={"/gwte"} />;
                  })
                  .catch((err) => console.log(err));
            } else if (decodedToken.includes("ROLE_MANAGER")) {
               loadManagerByLogin(res.data.id_token).then((response) => {
                  console.log(response);
                  //   return navigate("/manager");
                  window.location.replace("/manager");
                  // return <Navigate to={"/manage"} />;
               });
            } else if (decodedToken.includes("ROLE_ADMIN")) {
               loadUserByEmail(res.data.id_token)
                  .then((response) => {
                     //  return navigate("/admin");
                     return <Navigate to={"/admin"} />;
                  })
                  .catch((error) => console.log(error));
            }
         })
         .catch((err) => {
            console.log("authentication failed", err, credentials);
            setMessage("Login ou mot de passe incorrect");
            message.error("erreur :Login ou mot de passe incorrect");
         });
   };
   return (
      <Modal
         // centered
         open={open}
         onOk={() => setopen(false)}
         onCancel={() => setopen(false)}
         footer={null}
         style={{
            top: "15%",
            right: "-35%",
            display: "inline-flex",
            height: "auto",
            width: "auto",
            padding: 0,
            margin: 0,
            zIndex: 999999,
            background: "transparent",
         }}
      >
         <form
            style={{
               height: "auto",
               width: "500px",
               padding: 0,
               margin: 0,
            }}
            onSubmit={(e) => onSubmit(e)}
         >
            <div
               className="card hoverable"
               style={{
                  backdropFilter: "blur(3px)",
                  background: "transparent",
               }}
            >
               <div className="card-stacked">
                  <div className="card-content">
                     <div
                        className="card-header center "
                        style={{ background: "#009791" }}
                     >
                        <h2
                           style={{
                              color: "white",
                              fontSize: "25px",
                           }}
                        >
                           Authentification
                        </h2>
                     </div>
                     <div
                        style={{
                           display: "flex",
                           justifyContent: "center",
                           justifyItems: "center",
                           width: "auto",
                           heighth: "auto",
                           backgroundColor: "rgba(5,5,5,0.1)",
                        }}
                     >
                        <img
                           style={{
                              width: "150px",
                              color: "#fff",
                              borderRadius: "25%",
                              height: "auto",
                           }}
                           src={logogSonatel}
                           alt="logo"
                        />
                     </div>
                     <div className="card-body">
                        <div className="form-group">
                           <label htmlFor="username">Identifiant</label>
                           <input
                              id="username"
                              type="text"
                              name="username"
                              value={credentials.username}
                              className="form-control"
                              onChange={(e) => onChange(e)}
                           ></input>
                        </div>
                        <div className="form-group">
                           <label htmlFor="password">Mot de passe</label>
                           <input
                              id="password"
                              type="password"
                              name="password"
                              value={credentials.password}
                              className="form-control"
                              onChange={(e) => onChange(e)}
                           ></input>
                        </div>
                     </div>
                  </div>
                  <div className="card-action center">
                     <button
                        type="submit"
                        className="btn"
                        style={{
                           backgroundColor: "#009791",
                           color: "white",
                        }}
                     >
                        Valider
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </Modal>
   );
};
