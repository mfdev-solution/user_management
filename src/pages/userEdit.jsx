import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserForm from '../components/userForm'
import Users from '../models/users'
const  UserEdit = () => {
  const [usersList] = useState(Users)
  const id = parseInt(useParams("id").id)
  
  const newUser = Users.find(user => user.id === id)||null
 
  return (
    
    <div className='container'>
      {/* {console.log(user)} */}
      {newUser !== null?(
       <>
        <h2> Modifier un utilisateur {newUser.name} {newUser.id}</h2>
        <UserForm  initialForm={newUser}  isEdit={true} ></UserForm>
       </>
      )
       :(

         <h2>No match user</h2>
       )
      }
    </div>
  )
}

export default UserEdit