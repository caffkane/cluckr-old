exports.up = function (knex) {
    return knex.schema.createTable("clucks", t => {
        t.bigIncrements("id");
        t.string("username");
        t.string("image_url");
        t.text("content");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
        t.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("clucks");
};