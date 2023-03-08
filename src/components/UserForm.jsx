import React, { useEffect, useState } from 'react'
import { redirect } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import {updateOrAddUser} from '../services/UserService'

const  UserForm =({initialForm , isEdit})=> {
    const id = initialForm.id;
    const [form , setForm] = useState({})
useEffect(()=>{
    setForm(initialForm)
},[initialForm])
  const inputOnChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value
    setForm({...form,[name]:value})
  }
  const onSubmit  = (e)=>{
    e.preventDefault();
    // console.log(form.name);
    initialForm.name = form.name
    initialForm.email = form.email
    initialForm.age = form.age
    initialForm.role = form.role
    console.log(initialForm.name);
    const idNew = isEdit?id:-1;
    updateOrAddUser(idNew,form)
    return redirect('/users')
    // (isEdit)?updateuser():addUser()
  }

  return (
    
    <div className='container'>
        <div className="row">
            <div className="col">
              <form  onSubmit={(e) =>onSubmit(e)} className="form-floating">
              <div className="form-floating mb-3">
                <input type="text" name='name' className="form-control" id="name" placeholder="Enter your name" value={form.name}  onChange={(e)=>{inputOnChange(e)}}/>
                <label htmlFor="name">Your name </label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" name='email' className="form-control" id="email" placeholder="Email" value={form.email} onChange={(e)=>{inputOnChange(e)}} />
                <label htmlFor="email">Your email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" name='age' className="form-control" id="age" placeholder="Age" value={form.age} onChange={(e)=>{inputOnChange(e)}}/>
                <label htmlFor="age">Your age</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" name='role' className="form-control" id="role" placeholder="Admin User" value={form.role} onChange={(e)=>{inputOnChange(e)}}/>
                <label htmlFor="role">Select your role</label>
              </div>
              <div className="mb-3">
              <button type="submit" className="btn btn-primary">Primary</button>
              </div>
              </form>

            </div>
        </div>
    </div>
  )
}

export default UserForm