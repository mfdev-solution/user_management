import React from 'react'
import { Navigate } from 'react-router-dom';
const  AuthGard = ({children}) =>{
    const isLogged = false;

    if(!isLogged){
        return <Navigate to={'/users/auth'} />
    }
  return children
}

export default AuthGard
