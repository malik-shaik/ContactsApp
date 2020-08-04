exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.string("id");
      table.string("name");
      table.string("email").unique();
      table.string("password");
    })
    .createTable("contacts", (table) => {
      table.string("id");
      table.string("name");
      table.string("email");
      table.integer("phone");
      table.string("type");
      table.string("user_id").notNullable();
      table.foreign("user_id").references("users.id");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("contacts").dropTableIfExists("users");
};
