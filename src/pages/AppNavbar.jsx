import React, { useState } from "react";

import { logout, isLoged } from "../services/";
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

const AppNavbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const toLogout = ()=>{
      // logout(e);
      logout()
      window.location.replace('/users/auth')
      window.location.reload()
   }
   return (
      <Navbar color="dark" dark expand="md">
         {/* <NavbarBrand tag={Link} to="/">Home</NavbarBrand> */}
         {/* {console.log(UsersList)} */}
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
               <NavItem>
                  <NavLink href="https://github.com/mfdev-solution">
                     GitHub
                  </NavLink>
               </NavItem>
               {isLoged() ? (
                  <NavItem>
                     <NavLink onClick={toLogout}><span >LOGOUT</span></NavLink>
                  </NavItem>
               ) : (
                  ""
               )}
            </Nav>
         </Collapse>
      </Navbar>
   );
};

export default AppNavbar;
