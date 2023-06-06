import React from "react";
import axios from "axios";

import { saveToken } from "./auth_service";
import { Navigate, useNavigate } from "react-router-dom";

export const login = async (username, password, rememberMe = false) => {
   try {
      const response = await axios.post(
         "http://localhost:8080/api/authenticate",
         {
            username: username,
            password: password,
            rememberMe: rememberMe,
         }
      );
      return response;
   } catch (error) {
      return error;
   }
};
