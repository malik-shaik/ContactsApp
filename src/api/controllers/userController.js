const path = require("path");
const userService = require("../../services/userService");
const { userMessage } = require("../../constants");
const {
  validateData,
  getSuccessResponse,
  getErrorResponse,
  validationFailed,
} = require("../../helpers");
const {
  GET_ALL_USERS,
  GET_ONE_USER,
  USER_CREATED,
  USER_LOGGEDIN,
  PROFILE_UPDATED,
  FORGOT_PASS_MSG,
  RESET_PASSWORD,
} = userMessage;
let response = {};

// ##################################################################
module.exports.getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    response = getSuccessResponse(response, GET_ALL_USERS, result);
  } catch (error) {
    response = getErrorResponse("Controller", "getAllUsers", error, response);
  }
  return res.status(response.status).send(response);
};

// ##################################################################
module.exports.getOneUser = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const result = await userService.getOneUser(req.user.id);
    response = getSuccessResponse(response, GET_ONE_USER, result);
  } catch (error) {
    response = getErrorResponse("Controller", "getOneUser", error, response);
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// REGISTER USER CONTROLLER
module.exports.registerUser = async (req, res) => {
  try {
    const errors = validateData(req);
    if (!errors.isEmpty()) response = validationFailed(response, errors);
    else {
      const result = await userService.registerUser(req);
      response = getSuccessResponse(response, USER_CREATED, result);
    }
  } catch (error) {
    response = getErrorResponse("Controller", "registerUser", error, response);
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// LOGIN USER CONTROLLER
module.exports.loginUser = async (req, res) => {
  try {
    const errors = validateData(req);
    if (!errors.isEmpty()) response = validationFailed(response, errors);
    else {
      const result = await userService.loginUser(req.body);
      response = getSuccessResponse(response, USER_LOGGEDIN, result);
    }
  } catch (error) {
    response = getErrorResponse("Controller", "loginUser", error, response);
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// PROFILE UPDATE CONTROLLER
module.exports.profileUpdate = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const data = { user: req.user, data: req.body };
    const result = await userService.profileUpdate(data);
    response = getSuccessResponse(response, PROFILE_UPDATED, result);
  } catch (error) {
    response = getErrorResponse("Controller", "profileUpdate", error, response);
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// FORGOT PASSWORD CONTROLLER
module.exports.forgotPassword = async (req, res) => {
  try {
    const result = await userService.forgotPassword(req.body);
    response = getSuccessResponse(response, FORGOT_PASS_MSG, result);
  } catch (error) {
    response = getErrorResponse(
      "Controller",
      "forgotPassword",
      error,
      response
    );
  }
  return res.status(response.status).send(response);
};

// ##################################################################
// RESET PASSWORD LINK CONTROLLER
module.exports.resetPassLink = async (req, res) => {
  try {
    return res.sendFile(
      path.resolve(__dirname + "/../../views/resetpass.html")
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
// ##################################################################
// RESET PASSWORD CONTROLLER
module.exports.resetPassword = async (req, res) => {
  try {
    if (req.err) throw new Error(req.err);
    const userdata = { user: req.user, data: req.body };
    const result = await userService.resetPassword(userdata);
    response = getSuccessResponse(response, RESET_PASSWORD, result);
  } catch (error) {
    response = getErrorResponse("Controller", "resetPassword", error, response);
  }
  return res.status(response.status).send(response);
};
