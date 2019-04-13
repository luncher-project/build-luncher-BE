exports.up = function(knex, Promise) {
    return knex.schema.createTable('schools', table => {
      table
      .increments();
  
      table
      .string('schoolName', 512)
      .notNullable();
  
      table
      .string('state', 2)
      .notNullable();

      table
      .integer('zip')
      .notNullable()
      .unique();

      table
      .integer('fundsNeeded')
      .notNullable();
  
      table
      .integer('fundsReceived')
      .notNullable();

      table
      .integer('adminID')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('schools');
  };

