const { db_credentials } = require("../config");
const { client, database, user, password } = db_credentials;

module.exports = {
  development: {
    client: "mysql",
    connection: { database, user, password },
    migrations: { directory: __dirname + "/migrations" },
  },
};
