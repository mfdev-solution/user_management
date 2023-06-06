import React from "react";
import { Navigate } from "react-router-dom";
import { AccessDenied } from "../pages/AccessDenied";
import { decodeToken, getToken } from "../services";

export const AuthorityGuard = ({ children, requireRoles }) => {
   const currentAuthorities = decodeToken(getToken()).auth;
   const hasRequiredAuthority = currentAuthorities.includes(requireRoles);
   if (!hasRequiredAuthority) {
      return <Navigate to={"/access-denied"} />;
   }
   console.log(children);

   return children;
}
