const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  port: process.env.PORT,
  environment: process.env.ENVIRONMENT,
  jwtSecret: process.env.JWTSECRET,
  db_credentials: {
    client: process.env.DB_CLIENT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
  },
  serverEmailCredentials: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_EMAIL_PORT,
    email: process.env.SERVER_EMAIL,
    password: process.env.SERVER_PASSWORD,
  },
};
