// import React from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'
import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/userapi";

/**
 * By Axios API
 * Importing a list of users from the database
 * @returns list of users
 */
export const GetUsers = async () => {
   try {
      const response = await fetch(`${baseUrl}/users`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
         },
      });

      return response.json();
   } catch (err) {
      console.log(err);
      return console.log(err);
   }
};

/**
 * By Axios API
 * Importing a list of users from the database
 * @returns list of users
 */
export const GetUsersAxios = async () => {
   try {
      const res = await Axios.get("http://localhost:8080/userapi/users");
      return res.data;
   } catch (err) {
      return console.log(err);
   }
};

/**
 * By fetch
 * delete a user from the database
 * @param {*} e an event object
 * @param {*} id id of an user
 * @returns a list of users or an error
 */
export const deleUser = async (e, id) => {
   e.preventDefault();
   // eslint-disable-next-line no-restricted-globals
   const confirmed = confirm("are you sure you want to delete");
   if (confirmed === true) {
      return await fetch(`${baseUrl}/users/${id}`, {
         method: "DELETE",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
      });
   }
   return null;
};

/**
 * By Axios API
 * delete a user from the database
 * @param {*} e an event object
 * @param {*} id id of an user
 * @returns a list of users or an error
 */
export const deleteUserAxios = (e, id) => {
   e.preventDefault();
   // eslint-disable-next-line no-restricted-globals
   let confirmed = confirm("are you sure you want to delete");
   if (confirmed === true) {
      return Axios.delete(`${baseUrl}/users/${id}`);
   }
   return null;
};
/**
 * By fetch
 * get a user by id
 * @param {*} id
 * @returns  user object or null if not found
 */
export const GetUserById = async (id) => {
   try {
      const response = await fetch(`${baseUrl}/users/${id}`);
      return response.json();
   } catch (err) {
      console.log(err);
      return console.log(err);
   }
};
/**
 * By Axios API calls
 * get a user by id
 * @param {*} id
 * @returns user or null if not found
 */
export const GetUserByIdAxios = async (id) => {
   try {
      const res = await Axios.get(`${baseUrl}/users/${id}`);
      return res.data;
   } catch (err) {
      return err;
   }
};
/**
 * By fetch
 * updates of adds a user
 * @param {*} id
 * @param {*} user
 * @returns
 */
export const updateOrAddUser = async (id, user) => {
   // const navigate = useNavigate();
   console.log("acced");
   const idsreing = id !== -1 ? `/${id}` : ``;
   const methode = id === -1 ? "POST" : "PUT";
   return await fetch(`${baseUrl}/users${idsreing}`, {
      method: methode,
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   });
};

export const addOrUpdateUserAxios = (id, user) => {
   if (id === -1) {
      return Axios.post(`${baseUrl}/users`, user)
         .then((res) => res.data)
         .catch((err) => err.message);
   }
   return Axios.put(`${baseUrl}/users/${id}`, user)
      .then((res) => res.data)
      .catch((err) => err.message);
};
