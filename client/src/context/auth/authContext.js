import React, { createContext, useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
import { reducer, authState } from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../types";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authData, dispatch] = useReducer(reducer, authState);
  const { token, isAuthenticated, loading, error, user } = authData;

  // Load User
  const loadUser = async () => {
    const options = {
      method: "GET",
      headers: { "auth-token": localStorage.getItem("token") },
    };
    const res = await fetch("/api/users/byid", options);
    const data = await res.json();
    const user = data.body;
    if (data.status === 200) {
      dispatch({ type: USER_LOADED, payload: user });
    } else dispatch({ type: AUTH_ERROR, payload: data.message });
  };

  // Register User
  const register = async (formData) => {
    const options = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch("/api/users/register", options);
    const data = await res.json();
    console.log("data from server...", data);
    if (data.status === 200) {
      const { token, user } = data.body;
      dispatch({ type: REGISTER_SUCCESS, payload: { token, user } });
    } else dispatch({ type: REGISTER_FAIL, payload: data.message });
  };

  // Login User
  const login = async (formData) => {
    const options = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch("/api/users/login", options);
    const data = await res.json();
    if (data.status === 200) {
      const { token, user } = data.body;
      dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
    } else dispatch({ type: LOGIN_FAIL, payload: data.message });
  };

  //Forgot password
  const resetPasswordEmail = async (email) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch("/api/users/forgotpassword", options);
    const data = await res.json();
    console.log(data);
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        error,
        loading,
        register,
        isAuthenticated,
        loadUser,
        login,
        logout,
        clearErrors,
        resetPasswordEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
