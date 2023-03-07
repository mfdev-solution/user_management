import React from 'react'
import UserForm from '../components/userForm'

const UserAdd = () => {
  return (
    <div className='container'>
        <h2> Ajout  d'un utilisateur</h2>
        <UserForm initialFom={{}} isEdit={false} />
    </div>
  )
}

export default UserAdd