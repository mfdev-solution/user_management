import React from "react";
import { Route, Routes } from "react-router-dom";
// import Authentication from './Authentication'
import Layout from "./Layout";
import PageNotFound from "./PageNotFound";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
import WraperUserList from "../components/WraperUserList";

// import {UsersList} from './rootExports'
const UserRoute = ({ role }) => {
   return (
      <Routes>
         <Route>
            <Route element={<Layout />}>
               <Route index element={<WraperUserList role={role} />} />
               <Route path="/users" element={<WraperUserList role={role} />} />
               <Route path="/users/add" element={<UserAdd />} />
               <Route path="/users/edit/:id" element={<UserEdit />} />
               <Route path="*" element={<PageNotFound />} />
            </Route>
         </Route>
      </Routes>
   );
};
export default UserRoute;
