exports.up = function(knex, Promise) {
    return knex.schema.createTable('donations', table => {
      table
      .increments();
  
      table
      .integer('amount', 512)
      .notNullable();
  
      table
      .time('timestamp')


      table
      .integer('donorID')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

      table
      .integer('schoolID')
      .unsigned()
      .references('id')
      .inTable('schools')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('donations');
  };
