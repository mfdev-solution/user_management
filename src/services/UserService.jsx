// import React from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'

const baseUrl = 'http://localhost:8080/userapi'
export const  GetUsers = async () => {
  try {
        const response = await fetch(`${baseUrl}/users`)
        
        return  response.json()
    } catch (err) {
        console.log(err);
        return console.log(err)
    }
}
export const deleUser = async(e,id)=>{
    e.preventDefault()
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("are you sure you want to delete")
    if(confirmed===true){
        return await fetch(`${baseUrl}/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
    }
    return null
}
export const  GetUserById = async (id) => {
    try {
          const response = await fetch(`${baseUrl}/users/${id}`)
          return  response.json()
      } catch (err) {
          console.log(err);
          return console.log(err)
      }
  }

export const updateOrAddUser = async (id , user) =>{
    // const navigate = useNavigate();
    console.log("acced");
    const idsreing = id !==-1?`/${id}`:``;
    const methode = id === -1 ? "POST" : "PUT";
     return await fetch(`${baseUrl}/users${idsreing}`,{
        method:methode,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
    })
}

// export const deleteUser = async (id) =>{
//     await fetch(`${baseUrl}/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       })
// }

