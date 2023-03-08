import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppNavbar from './pages/AppNavbar';

import UserRoute from './pages/UserRoute';
const App = () => {
  return (
    <>
      <AppNavbar />
      <Router>
        <UserRoute />
      </Router>
    </>
  )
}

export default App;