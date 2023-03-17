import React, { useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import userImg from "../static/user.png";
import { deleteUserAxios } from "../services/";
export const UsersList = ({ role, users }) => {
   //list of users
   const [userListNew, setUserListNew] = useState(users);

   const onDeleteUser = (e, id) => {
      deleteUserAxios(e, id)
         .then((users) => {
            users !== null &&
               setUserListNew([...userListNew].filter((i) => i.id !== id));
         })
         .catch((err) => console.log(err.response));
   };

   return (
      <>
         {users.map((user) => {
            return (
               <div className="col-3 s6 m4">
                  <div className="card horizontal">
                     <div className="row d-flex">
                        <div className="col-4">
                           <div className="card-image">
                              <img
                                 src={userImg}
                                 className="img-fluid rounded-start"
                                 alt="..."
                              />
                           </div>
                        </div>
                        <div className="col-8">
                           <div class="card-stacked">
                              <div class="card-content">
                                 <p class="card-text">
                                    <span className="d-flex justify-content-around">
                                       <small >Nom</small>
                                       <small> {user.name}</small>
                                    </span>
                                 </p>
                                 <p className="card-text">
                                    <span className="d-flex justify-content-around">
                                       <small >Email</small>
                                       <small> {user.email}</small>
                                    </span>
                                 </p>
                                 <p className="card-text">
                                    <span className="d-flex justify-content-around">
                                       <small >Age</small>
                                       <small> {user.age}</small>
                                    </span>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     {role === "ADMIN" && (
                        <div className="row">
                           <div class="d-flex justify-content-between">
                              <Link to={`/users/edit/${user.id}`}>
                                 <i className="material-icons">edit</i>
                              </Link>

                              <Button
                                 size="sm"
                                 color="danger"
                                 onClick={(e) => onDeleteUser(e, user.id)}
                              >
                                 Delete
                              </Button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            );
         })}

         {role === "ADMIN" && (
            <Link
               to={"/users/add"}
               className="btn-floating btn-large waves-effect waves-light green z-depth-3"
               style={{ position: "fixed", bottom: "25px", right: "25px" }}
            >
               <i className="material-icons">add</i>
            </Link>
         )}
      </>
   );
};

export default UsersList;
