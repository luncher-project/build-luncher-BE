exports.seed = function(knex, Promise) {
  return knex('donations')
    .del()
    .then(function() {
      return knex('donations').insert([
        {
          id: 1,
          amount: 200,
          donorID: 6,
          schoolID: 1,
        },
        {
          id: 2,
          amount: 150,
          donorID: 6,
          schoolID: 2,
        },
        {
          id: 3,
          amount: 300,
          donorID: 7,
          schoolID: 1,
        },
        {
          id: 4,
          amount: 200,
          donorID: 8,
          schoolID: 3,
        },
        {
          id: 5,
          amount: 100,
          donorID: 8,
          schoolID: 3,
        },
        {
          id: 6,
          amount: 100,
          donorID: 9,
          schoolID: 4,
        },
        {
          id: 7,
          amount: 50,
          donorID: 10,
          schoolID: 5,
        },
      ]);
    });
};
