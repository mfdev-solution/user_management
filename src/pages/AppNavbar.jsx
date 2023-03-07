import React, { useState } from 'react';
import { Collapse, Nav, Navbar,Button, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import Users from '../models/users';

const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md">
      {/* <NavbarBrand tag={Link} to="/">Home</NavbarBrand> */}
      {/* {console.log(UsersList)} */}
       <NavbarBrand> <NavLink href='/'> Home</NavLink></NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
          <NavItem>
            <NavLink href="https://twitter.com/mfdev">@mfdev</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/mfdev-solution">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
