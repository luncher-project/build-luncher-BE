exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, firstName: 'Arthur', lastName: 'Jones', email: 'arthurjones@gmai.com', password: 'nonhashedpassword', role: 'admin'},
        {id: 2, firstName: 'Betty', lastName: 'Yates', email: 'bettyyates@gmai.com', password: 'nonhashedpassword', role: 'admin'},
        {id: 3, firstName: 'Simon', lastName: 'Bates', email: 'simonbates@gmai.com', password: 'nonhashedpassword', role: 'admin'},
        {id: 4, firstName: 'Tracy', lastName: 'Tibbs', email: 'tracytibbs@gmai.com', password: 'nonhashedpassword', role: 'donor'},
        {id: 5, firstName: 'Peter', lastName: 'Merty', email: 'petermurty@gmai.com', password: 'nonhashedpassword', role: 'donor'},
      ]);
    });
};
