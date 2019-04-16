exports.up = function(knex, Promise) {
    return knex.schema.createTable('donations', table => {
      table
      .increments();
  
      table
      .integer('amount', 512)
      .notNullable();
  
      table
      table.timestamps(true, true);

      table
      .integer('donorID')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

      table
      .integer('schoolID')
      .unsigned()
      .references('id')
      .inTable('schools')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('donations');
  };
