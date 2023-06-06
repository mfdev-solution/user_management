import React from 'react'
import { Navigate } from 'react-router-dom';
import { isLoged } from '../services/';
const  AuthGard = ({children}) =>{
    if(!isLoged()){
        return <Navigate to={'/users/auth'} />
    }
  return children
}

export default AuthGard
