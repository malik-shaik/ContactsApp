import React, { useContext, useRef, useEffect } from "react";
import { ContactContext } from "../../context/contacts/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { clearFilter, filterContacts, filtered } = contactContext;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) text.current.value = "";
  });

  const onChange = (e) => {
    if (text.current.value !== "") filterContacts(e.target.value);
    else clearFilter();
  };

  return (
    <div>
      <form>
        <input
          ref={text}
          type="text"
          placeholder="Filter Contacts..."
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default ContactFilter;
