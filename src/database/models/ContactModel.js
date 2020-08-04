const { Model } = require("objection");

class ContactModel extends Model {
  static get tableName() {
    return "contacts";
  }
}

module.exports = ContactModel;
