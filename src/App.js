import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './pages/AppNavbar';
import {loadUserByEmail} from './services'

import UserRoute from './pages/UserRoute';
import AuthGard from './utils/AuthGard';
import Authentication from './pages/Authentication';
const App = () => {
  const [role, setRole] = useState();
useEffect(()=>{
  loadUserByEmail(localStorage.getItem("token")).then(user => setRole(user.role))
},[])


  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={
            <AuthGard>
              <AppNavbar role={role} />
              <UserRoute  role={role}/>
            </AuthGard>
          } />
          <Route path='/users/auth' element={<Authentication />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;