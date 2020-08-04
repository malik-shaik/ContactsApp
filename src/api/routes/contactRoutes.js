const router = require("express").Router();
const contactController = require("../controllers/contactController");
const { authorization } = require("../../middlewares/authorization");

router.post("/create", authorization, contactController.createContact);

router.get("/byuser", authorization, contactController.getContactsByUser);

router.put("/:contactid", authorization, contactController.updateContact);

router.delete("/:contactid", authorization, contactController.deleteContact);

module.exports = router;
