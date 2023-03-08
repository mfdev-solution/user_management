import React from 'react'
import { Navigate } from 'react-router-dom';
import { isLoged } from '../services/auth_service';
const  AuthGard = ({children}) =>{
    // const isLogged = true;

    if(!isLoged()){
        return <Navigate to={'/users/auth'} />
    }
  return children
}

export default AuthGard
