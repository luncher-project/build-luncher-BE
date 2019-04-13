exports.seed = function(knex, Promise) {
  return knex('schools')
    .del()
    .then(function() {
      return knex('schools').insert([
        {
          id: 1,
          schoolName: 'Abraxas Continuation High',
          state: 'CA',
          zip: 92064,
          fundsNeeded: 365,
          fundsReceived: 0,
          adminID: 1,
        },
        {
          id: 2,
          schoolName: '3D Academy',
          state: 'TX',
          zip: 78537,
          fundsNeeded: 820,
          fundsReceived: 0,
          adminID: 2,
        },
      ]);
    });
};
