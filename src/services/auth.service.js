import axios from "axios";
import { useState, useContext } from "react";
import jwt from "jwt-decode";

import getApiUrl from './auth-config';
const API_URL = getApiUrl();


class AuthService {
  isLoggedIn() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    const jwt = this.decodeJwt();
    return jwt.roles.includes("ROLE_ADMIN");
  }

  decodeJwt() {
    return  jwt(JSON.parse(localStorage.getItem("user")).token);
  }

  login(login, password) {
    var formData = new FormData();

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    formData.append("login", login);

    formData.append("password", password);

    return axios.post(API_URL + "login", formData, config).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {}
}

export default new AuthService();
