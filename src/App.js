import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './pages/usersList';
import AppNavbar from './pages/AppNavbar';
import UserEdit from './pages/userEdit';
import UserAdd from './pages/userAdd';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <>
      <AppNavbar />
      <Router>
        <Routes>
          
          <Route path='/' exact={true} element={<UsersList />} />
         

          <Route path='/users' exact={true} element={<UsersList />} />
          <Route path='/users/add' exact={true} element={<UserAdd />} />
          <Route path='/users/edit/:id' exact={true} element={<UserEdit />} />
          <Route  eelement={<PageNotFound />} />
         
        </Routes>
      </Router>
    </>
  )
}

export default App;