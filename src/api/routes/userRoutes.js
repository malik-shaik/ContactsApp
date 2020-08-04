const router = require("express").Router();
const userController = require("../controllers/userController");
const { registrationValidFields, loginValidField } = require("../../helpers");
const { authorization } = require("../../middlewares/authorization");

router.get("/", userController.getAllUsers);

router.get("/resetpass", userController.resetPassLink);

router.get("/byid", authorization, userController.getOneUser);

router.post("/register", registrationValidFields, userController.registerUser);

router.post("/login", loginValidField, userController.loginUser);

router.put("/profile/update", authorization, userController.profileUpdate);

router.post("/forgotpassword", userController.forgotPassword);

router.put("/resetpassword", authorization, userController.resetPassword);

module.exports = router;
