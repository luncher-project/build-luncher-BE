exports.seed = function(knex, Promise) {
  return knex('schools')
    .del()
    .then(function() {
      return knex('schools').insert([
        {
          id: 1,
          schoolName: 'Marion-Sterling Elementary School',
          state: 'OH',
          zip: 44115,
          fundsNeeded: 2500,
          fundsReceived: 500,
          adminID: 1,
        },
        {
          id: 2,
          schoolName: 'Nathan Hale Junior High',
          state: 'OK',
          zip: 74129,
          fundsNeeded: 3200,
          fundsReceived: 150,
          adminID: 2,
        },
        {
          id: 3,
          schoolName: 'Crow Agency School',
          state: 'MT',
          zip: 59022,
          fundsNeeded: 1200,
          fundsReceived: 300,
          adminID: 3,
        },
        {
          id: 4,
          schoolName: 'East St. Louis Lincoln Middle School',
          state: 'IL',
          zip: 62201,
          fundsNeeded: 6200,
          fundsReceived: 100,
          adminID: 4,
        },
        {
          id: 5,
          schoolName: '3D Academy',
          state: 'TX',
          zip: 78537,
          fundsNeeded: 800,
          fundsReceived: 50,
          adminID: 5,
        },
      ]);
    });
};
