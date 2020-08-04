import React, { createContext, useReducer } from "react";
import { reducer, contactState } from "./contactReducer";
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACTS,
} from "../types";

export const ContactContext = createContext();

export const ContactProvider = (props) => {
  const [contactsData, dispatch] = useReducer(reducer, contactState);
  const { contacts, current, filtered } = contactsData;

  // Load all contacts
  const loadAllContacts = async () => {
    const options = {
      method: "GET",
      headers: { "auth-token": localStorage.getItem("token") },
    };
    const res = await fetch("/api/contacts/byuser", options);
    const data = await res.json();
    if (data.status === 200)
      dispatch({ type: GET_CONTACTS, payload: data.body });
  };

  // ADD Contact
  const addContact = async (contact) => {
    const options = {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const res = await fetch("/api/contacts/create", options);
    const data = await res.json();

    if (data.status === 200) {
      const { id, name, email, phone, type } = data.body;
      const contact = { id, name, email, phone, type };
      dispatch({ type: ADD_CONTACT, payload: contact });
    }
    // else dispatch({ type: REGISTER_FAIL, payload: data.message });
  };

  //Update Contact
  const updateContact = async (contact) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const res = await fetch(`/api/contacts/${contact.id}`, options);
    const data = await res.json();
    if (data.status === 200) {
      const { id, name, email, phone, type } = data.body;
      const contact = { id, name, email, phone, type };
      dispatch({ type: UPDATE_CONTACT, payload: contact });
    }
  };
  //Delete Contact
  const deleteContact = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const res = await fetch(`/api/contacts/${id}`, options);
    const data = await res.json();
    if (data.status === 200) {
      dispatch({ type: DELETE_CONTACT, payload: id });
    }
  };
  //Set Current Contact
  const setCurrentContact = (id) => {
    dispatch({ type: SET_CURRENT, payload: id });
  };
  //Clear Current Contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Filter Contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        current,
        filtered,
        loadAllContacts,
        addContact,
        updateContact,
        deleteContact,
        clearFilter,
        filterContacts,
        setCurrentContact,
        clearCurrentContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
