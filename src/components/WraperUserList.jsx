import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import UsersList from "../pages/UsersList";
import { GetUsersAxios } from "../services";
import Pagination from "./Pagination";

const WraperUserList = ({ role }) => {
    // let nbUsers = 8;
   const [isLoading, setIsLoading] = useState(false);
   const [Listusers, setListUsers] = useState([]);
   const [currentPage, setcurrentPage] = useState(1);
   const [usersPerPage, setUsersPerPage] = useState(8);

   useEffect(() => {
      setIsLoading(true);
      // window.location.reload()
      //  GetUsersAxios();

      GetUsersAxios()
         .then((users) => setListUsers(users))
         .catch((err) => err);
      setIsLoading(false);
   }, []);
   if (isLoading) {
      return <h2> data are loading ...</h2>;
   }
   const lastUsersIndex = currentPage * usersPerPage;
   const firstUsersIndex = lastUsersIndex - usersPerPage;
   const currentUsers = Listusers.slice(firstUsersIndex, lastUsersIndex);
   const nbUser = Math.ceil(Listusers.length / usersPerPage);

   return (
      <div className="center">
         <div className=" container">
            
            <div className="row">
               {/* <Table className="mt-4"> */}
               {/* <caption>Liste des utilisateurs</caption> */}
               <UsersList role={role} users={currentUsers} />
               {/* </Table> */}
            </div>
            <div className="row">
               <Pagination
                  nbUser={nbUser}
                  currentPage={currentPage}
                  setcurrentPage={setcurrentPage}
               />
            </div>
               <button onClick={()=>{ setUsersPerPage(usersPerPage+1)}}> plus user</button>
         </div>
      </div>
   );
};

export default WraperUserList;
