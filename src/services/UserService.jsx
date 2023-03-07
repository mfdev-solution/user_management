import React from 'react'


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

// export const deleteUser = async (id) =>{
//     await fetch(`${baseUrl}/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       })
// }

