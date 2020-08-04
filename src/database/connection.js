const { environment: env } = require("../config");
const environment = env || "development";

const Knex = require("knex");
const config = require("./knexfile");
const { Model } = require("objection");

const environmentConfig = config[environment];
const knex = Knex(environmentConfig);

module.exports = async () => await Model.knex(knex);
