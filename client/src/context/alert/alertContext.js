import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { reducer, alertState } from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

export const AlertContext = createContext();

export const AlertProvider = (props) => {
  const [alerts, dispatch] = useReducer(reducer, alertState);
  // const { alerts } = alertData;

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};
