exports.seed = function(knex, Promise) {
  return knex('donations')
    .del()
    .then(function() {
      return knex('donations').insert([
        {
          id: 1,
          amount: 50,
          donorID: 4,
          schoolID: 1,
        },
        {
          id: 2,
          amount: 75,
          donorID: 5,
          schoolID: 2,
        },
      ]);
    });
};