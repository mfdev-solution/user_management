import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
// import Users from '../models/users'
import { GetUserByIdAxios} from "../services/";
const UserEdit = () => {
   const id = parseInt(useParams("id").id);
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   // const newUser = Users.find(user => user.id === id)||null
   useEffect(() => {
      setIsLoading(true);
      GetUserByIdAxios(id).then((user) => setUser(user));
      setIsLoading(false);
   }, [id]);
   console.log(user);

   if (isLoading) return <h2> The data are on loading</h2>;

   return (
      <div className="container">
         {/* {console.log(user)} */}
         {user !== null ? (
            <>
               <h2>
                  {" "}
                  Modifier un utilisateur {user.name} {user.id}
               </h2>
               <UserForm initialForm={user} isEdit={true}></UserForm>
            </>
         ) : (
            <h2>No match user</h2>
         )}
      </div>
   );
};

export default UserEdit;
