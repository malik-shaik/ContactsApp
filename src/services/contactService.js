const queries = require("../database/queries");
const helperMethods = require("../helpers");

// ##################################################################
// GET ALL CONTACTS SERVIE
module.exports.getAllContacts = async () => {
  try {
    const result = await queries.contacts.getAll();
    return result;
  } catch (error) {
    helperMethods.getError("Service", "getAllContacts", error);
  }
};

// GET CONTACTS by USER IDs SERVIE
module.exports.getContactsByUser = async (user) => {
  try {
    const result = await queries.contacts.getContactsByUser(user.id);
    return result;
  } catch (error) {
    helperMethods.getError("Service", "getContactsByUser", error);
  }
};
// ##################################################################
// CREATE CONTACT SERVIE
module.exports.createContact = async (data) => {
  const { user, contactdata } = data;
  const contact = { ...contactdata };
  contact.id = helperMethods.getUniqId();
  contact.user_id = user.id;
  try {
    const result = await queries.contacts.createContact(contact);
    return result;
  } catch (error) {
    helperMethods.getError("Service", "createContact", error);
  }
};

// ##################################################################
// UPDATE CONTACT SERVIE
module.exports.updateContact = async (contactid, contactdata) => {
  try {
    const result = await queries.contacts.updateContact(contactid, contactdata);
    return result;
  } catch (error) {
    helperMethods.getError("Service", "updateContace", error);
  }
};

// ##################################################################
// DELETE CONTACT SERVIE
module.exports.deleteContact = async (contactid) => {
  try {
    const result = await queries.contacts.deleteContact(contactid);
    return result;
  } catch (error) {
    helperMethods.getError("Service", "deletContact", error);
  }
};
