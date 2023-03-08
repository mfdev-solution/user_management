import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../services/auth_service";

const Authentication = () => {
   //  const [username, setUserName] = useState("");
   //  const [password, setPassword] = useState("");
   const [message, setMessage] = useState();
   const [credentials, setCredentials] = useState({
      username: "",
      password: "",
   });
   const navigate = useNavigate();
   const onChange = (e) => {
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value,
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (credentials.username === "fall" && credentials.password === "fall") {
         const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImZhbGwiLCJpYXQiOjE1MTYyMzkwMjJ9.65txVXkAQ7jAzuxkr0lfiq68hFyoDW9KwYawy_pqqpc";
         saveToken(token);
         navigate("/users",{replace:true});
         window.location.replace();
      }
      setMessage("Login ou mot de passe incorrect");
   };

   return (
      <form onSubmit={(e) => onSubmit(e)}>
         <div className="container mt-5">
            <div className="row">
               <div className="col s12 m8 offset-m2">
                  <div className="card hoverable">
                     <div className="card-stacked">
                        <div className="card-content">
                           {/* Form message */}
                           {message && (
                              <div className="form-group">
                                 <div className="card-panel grey lighten-5">
                                    {message}
                                 </div>
                              </div>
                           )}
                           {/* Field username */}
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
                           {/* Field password */}
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
                        <div className="card-action center">
                           {/* Submit button */}
                           <button type="submit" className="btn">
                              Valider
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
};
export default Authentication;
