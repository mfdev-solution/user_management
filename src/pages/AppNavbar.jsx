import React, { useEffect, useState } from "react";

import { logout, isLoged, loadUserByEmail } from "../services/";
import {
   Collapse,
   Nav,
   Navbar,
   NavbarBrand,
   NavbarToggler,
   NavItem,
   NavLink,
} from "reactstrap";
// import Users from '../models/users';

const AppNavbar = ({role}) => {
   // const [role, setRole] = useState()
   const [isOpen, setIsOpen] = useState(false);
//   useEffect(()=>{
//      async function fetchData(){
//         const user =await loadUserByEmail(localStorage.getItem("token"))
//         setRole(user.role);
//      }
//      fetchData()
//   },[])
// loadUserByEmail(localStorage.getItem("token")).then(user => setRole(user.role))
   const toLogout = () => {
      // logout(e);
      logout();
      window.location.replace("/users/auth");
      window.location.reload();
   };
   return (
      <Navbar color="dark" dark expand="md">
         {/* <NavbarBrand tag={Link} to="/">Home</NavbarBrand> */}
         {
            
         }
         <NavbarBrand>
            <NavLink href="/"> Home</NavLink>
         </NavbarBrand>
         <NavbarToggler
            onClick={() => {
               setIsOpen(!isOpen);
            }}
         />
         <Collapse isOpen={isOpen} navbar>
            <Nav
               className="justify-content-end"
               style={{ width: "100%" }}
               navbar
            >
               <NavItem>
                  <NavLink href="https://twitter.com/mfdev">@mfdev</NavLink>
               </NavItem>
               
               {isLoged() ? (
                  <>
                     <NavItem>
                        <NavLink onClick={toLogout}>
                           <span>LOGOUT</span>
                        </NavLink>
                     </NavItem>
                     <NavItem>
                        {role}
                     </NavItem>
                  </>
               ) : (
                  ""
               )}
            </Nav>
         </Collapse>
      </Navbar>
   );
};

export default AppNavbar;
