const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require("uuid");
const { jwtSecret } = require("../config");
const { check, validationResult } = require("express-validator");
const emailModule = require("./emailModule");
const {
  errorResponse,
  successResponse,
  VALIDATION_FAILED,
} = require("../constants");

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports.checkPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports.createJWT = async (userid) => {
  const payload = { user: { id: userid } };
  return await jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
};

module.exports.registrationValidFields = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Invalid email address").isEmail(),
  check(
    "password",
    "Password must be min 4 alpha numberic charecters"
  ).isLength({ min: 4 }),
];

module.exports.loginValidField = [
  check("email", "Invalid email address").isEmail(),
  check(
    "password",
    "Password must be min 4 alpha numberic charecters"
  ).isLength({ min: 4 }),
];

module.exports.validateData = (data) => validationResult(data);

module.exports.validationFailed = (response, errors) => {
  response = { ...errorResponse };
  response.message = VALIDATION_FAILED;
  response.body = errors;
  return response;
};

module.exports.getUniqId = () => uuidv1();

module.exports.getErrorResponse = (errorIn, moduleName, error, response) => {
  console.log(`Error in: ${errorIn}: ${moduleName}`, error);
  response = { ...errorResponse };
  response.message = error.message;
  return response;
};

module.exports.getSuccessResponse = (response, message, result) => {
  response = { ...successResponse };
  response.message = message;
  response.body = result;
  return response;
};

module.exports.getError = (errorIn, moduleName, error) => {
  console.log(`Error in: ${errorIn}: ${moduleName}`, error);
  throw new Error(error);
};

module.exports.sendEmail = (firstname, email, token) =>
  emailModule(firstname, email, token);
