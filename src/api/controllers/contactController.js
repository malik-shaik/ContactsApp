const contactService = require("../../services/contactService");
const { getErrorResponse, getSuccessResponse } = require("../../helpers");
const { contactMessage } = require("../../constants");
const {
  GET_ALL_CONTACTS,
  CONTACT_CREATED,
  CONTACT_UPDATED,
  CONTACT_DELETED,
} = contactMessage;
let response = {};

// ##################################################################
// GET CONTACTS by USERS IDs CONTROLLER
module.exports.getContactsByUser = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const user = await contactService.getContactsByUser(req.user);
    response = getSuccessResponse(response, GET_ALL_CONTACTS, user);
  } catch (error) {
    response = getErrorResponse(
      "Controller",
      "getContactsByUser",
      error,
      response
    );
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// CREATE CONTACT CONTROLLER
module.exports.createContact = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const data = { user: req.user, contactdata: req.body };
    const result = await contactService.createContact(data);
    response = getSuccessResponse(response, CONTACT_CREATED, result);
  } catch (error) {
    response = getErrorResponse("Controller", "createContact", error, response);
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// UPDATE CONTACT CONTROLLER
module.exports.updateContact = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const result = await contactService.updateContact(
      req.params.contactid,
      req.body
    );
    response = getSuccessResponse(response, CONTACT_UPDATED, result);
  } catch (error) {
    response = getErrorResponse("Controller", "updateContact", error, response);
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// DELETE CONTACT CONTROLLER
module.exports.deleteContact = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const result = await contactService.deleteContact(req.params.contactid);
    response = getSuccessResponse(response, CONTACT_DELETED, result);
  } catch (error) {
    response = getErrorResponse("Controller", "deleteContact", error, response);
  }
  return res.status(response.status).send(response);
};
