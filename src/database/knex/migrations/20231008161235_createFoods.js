exports.up = (knex) =>
  knex.schema.createTable("foods", (table) => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.text("type");
    table.integer("price");
    table.text("image");
  });

exports.down = (knex) => knex.schema.dropTable("foods");
