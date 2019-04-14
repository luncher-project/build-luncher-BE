exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          id: 1,
          firstName: 'Jerry',
          lastName: 'Jones',
          email: 'jj@gmail.com',
          password: 'hashedpassword',
          role: 'admin',
        },
        {
          id: 2,
          firstName: 'Tracy',
          lastName: 'Bell',
          email: 'tb@gmail.com',
          password: 'hashedpassword',
          role: 'admin',
        },
        {
          id: 3,
          firstName: 'Harvey',
          lastName: 'Jones',
          email: 'hj@gmail.com',
          password: 'hashedpassword',
          role: 'admin',
        },
        {
          id: 4,
          firstName: 'Peter',
          lastName: 'Beattie',
          email: 'pb@gmail.com',
          password: 'hashedpassword',
          role: 'admin',
        },
        {
          id: 5,
          firstName: 'Hayleigh',
          lastName: 'Ryder',
          email: 'hr@gmail.com',
          password: 'hashedpassword',
          role: 'admin',
        },
        {
          id: 6,
          firstName: 'Betty',
          lastName: 'Yates',
          email: 'by@gmail.com',
          password: 'hashedpassword',
          role: 'donor',
        },
        {
          id: 7,
          firstName: 'Grace',
          lastName: 'Tibbs',
          email: 'gt@gmail.com',
          password: 'hashedpassword',
          role: 'donor',
        },
        {
          id: 8,
          firstName: 'Gary',
          lastName: 'Jones',
          email: 'gj@gmail.com',
          password: 'hashedpassword',
          role: 'donor',
        },
        {
          id: 9,
          firstName: 'Katie',
          lastName: 'Menks',
          email: 'km@gmail.com',
          password: 'hashedpassword',
          role: 'donor',
        },
        {
          id: 10,
          firstName: 'Peter',
          lastName: 'Oates',
          email: 'po@gmail.com',
          password: 'hashedpassword',
          role: 'donor',
        },
      ]);
    });
};
