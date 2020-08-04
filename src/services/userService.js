const queries = require("../database/queries");
const helperMethods = require("../helpers");

// ####################################################################
module.exports.getAllUsers = async () => {
  try {
    return await queries.users.getAll();
  } catch (error) {
    helperMethods.getError("Service", "getAllUsers", error);
  }
};

// ####################################################################
module.exports.getOneUser = async (userid) => {
  try {
    const result = await queries.users.getOne(userid);
    return result;
  } catch (error) {
    helperMethods.getError("Service", "getOneUser", error);
  }
};

// ####################################################################
// REGISTER SERVICE
module.exports.registerUser = async (req) => {
  const userdata = { ...req.body };
  userdata.id = helperMethods.getUniqId();

  try {
    const existingUser = await queries.users.getOneByEmail(userdata.email);
    if (existingUser) throw "User already exists.";

    userdata.password = await helperMethods.hashPassword(userdata.password);

    const result = await queries.users.createUser(userdata);
    delete result.password;
    const user = { ...result };

    const token = await helperMethods.createJWT(user.id);

    return { token, user };
  } catch (error) {
    helperMethods.getError("Service", "registerUser", error);
  }
};

// ####################################################################
// LOGIN SERVICE
module.exports.loginUser = async (userdata) => {
  try {
    const user = await queries.users.getOneByEmail(userdata.email);

    if (!user) throw "Invalid credentials.";
    const isMatch = await helperMethods.checkPassword(
      userdata.password,
      user.password
    );
    if (!isMatch) throw "Invalid credentials.";

    delete user.password;
    const token = await helperMethods.createJWT(user.id);

    return { token, user };
  } catch (error) {
    helperMethods.getError("Service", "loginUser", error);
  }
};

// ####################################################################
// PROFILE UPDATE SERVICE
module.exports.profileUpdate = async (userdata) => {
  const { user, data } = userdata;
  try {
    const result = await queries.users.updateUser(user, data);
    delete result.password;
    return result;
  } catch (error) {
    helperMethods.getError("Service", "profileUpdate", error);
  }
};

// ####################################################################
// FORGOT PASSWORD SERVICE
module.exports.forgotPassword = async (userdata) => {
  try {
    const user = await queries.users.getOneByEmail(userdata.email);
    if (!user) throw new Error("User does not exist. please register.");

    const token = await helperMethods.createJWT(user.id);
    helperMethods.sendEmail(user.name, user.email, token);
    return "Email sent to you with a link to reset password.";
  } catch (error) {
    helperMethods.getError("Service", "forgotPassword", error);
  }
};

// ####################################################################
// RESET PASSWORD SERVICE
module.exports.resetPassword = async (userdata) => {
  const { user, data } = userdata;
  try {
    data.password = await helperMethods.hashPassword(data.password);
    const result = await queries.users.updateUser(user, data);
    delete result.password;
    return result;
  } catch (error) {
    helperMethods.getError("Service", "resetPassword", error);
  }
};
