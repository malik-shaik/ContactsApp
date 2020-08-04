const User = require("./models/UserModel");
const Contact = require("./models/ContactModel");

module.exports = {
  users: {
    getAll: function () {
      return User.query();
    },
    getOne: function (userid) {
      return User.query().findById(userid);
    },
    getOneByEmail: function (useremail) {
      return User.query().findOne({ email: useremail });
    },
    createUser: function (userdata) {
      return User.query().insert(userdata);
    },
    updateUser: function (user, userdata) {
      return User.query().patchAndFetchById(user.id, userdata);
    },
  },
  contacts: {
    getContactsByUser: function (userid) {
      return Contact.query().select("*").where("user_id", userid);
    },
    createContact: function (contactdata) {
      return Contact.query().insert(contactdata);
    },
    updateContact: function (contactid, contactdata) {
      return Contact.query().patchAndFetchById(contactid, contactdata);
    },
    deleteContact: function (conatactid) {
      return Contact.query().deleteById(conatactid);
    },
  },
};
