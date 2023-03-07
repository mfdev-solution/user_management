import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Users from '../models/users'
import {GetUsers} from '../services/UserService'
const UsersList = () => {
    const [userListNew , setUserListNew] = useState({})
    useEffect(()=>{
        GetUsers().then(users => setUserListNew(users))
    },[])
    // console.log(userListNew);


  const userList = userListNew.map(user => {
    return <tr key={user.id}>
      <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.age}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/users/" + user.id}>Edit</Button>
          <Button size="sm" color="danger" >Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/users/new">Add User</Button>
        </div>
        <h3>Liste des utilisateur</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">email</th>
            <th>role</th>
            <th width="10%">age</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {userList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UsersList;