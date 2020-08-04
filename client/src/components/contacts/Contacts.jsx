import React, { Fragment, useContext, useEffect } from "react";
import { ContactContext } from "../../context/contacts/contactContext";
import Contact from "./Contact";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, loadAllContacts, loading } = contactContext;

  useEffect(() => {
    loadAllContacts(); //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        filtered !== null ? (
          filtered.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))
        ) : (
          contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
