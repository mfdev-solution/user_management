import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserRoute from './pages/UserRoute';
import AuthGard from './utils/AuthGard';
import Authentication from './pages/Authentication';
const App = () => {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={
            <AuthGard>
              {/* <AppNavbar /> */}
              <UserRoute />
            </AuthGard>
          } />

          <Route path='/users/auth' element={<Authentication />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;