import React from 'react'
import UserForm from '../components/UserForm'

const UserAdd = () => {
    const user = {
        name: 'John',
        email: 'john@example.com',
        age:15,
        role: 'user'
    }
  return (
    <div className='container'>
        <h2> Ajout  d'un utilisateur</h2>
        <UserForm initialForm={user} isEdit={false} />
    </div>
  )
}

export default UserAdd