import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Users from '../models/users'
import {GetUsers,deleUser} from '../services/UserService'
export const UsersList = () => {
    //list of users
    const [userListNew , setUserListNew] = useState([])
    const [isLoading , setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        GetUsers().then(users => setUserListNew(users))
        setIsLoading(false)
    },[])
    if(isLoading){
        return <h2> data are loading ...</h2>
    }
    const onDeleteUser =(e,id) =>{
        deleUser(e,id).then(users=>
            users!==null&&setUserListNew([...userListNew].filter(i => i.id !== id))
        )
    }
   
    
//show a user
  const userList = userListNew.map(user => {
    return <tr key={user.id}>
      <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.age}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={`/users/edit/${user.id}`}>Edit</Button>
          <Button size="sm" color="danger" onClick={(e)=>onDeleteUser(e,user.id)}  >Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div className='card container   '>
      {/* <div className="row justify-content-md-center">
        co
      </div> */}
        <div className="card-header">
            <h3>Liste des utilisateur</h3>
            <div className="float-end">
            <Button color="success" tag={Link} to="/users/add">Add User</Button>
            </div>
        </div>
        <div className="card-body">

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
        </div>
     
    </div>
  );
};

export default UsersList;