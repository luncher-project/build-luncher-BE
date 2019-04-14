    exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
      table
      .increments();
  
      table
      .string('firstName', 256)
      .notNullable();
  
      table
      .string('lastName', 256)
      .notNullable();

      table
      .string('email')
      .notNullable()
      .unique();
  
      table
      .string('password', 256)
      .notNullable();

      table
      .string('role')
      .notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
