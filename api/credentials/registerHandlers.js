const db = require('../../config/knexConfig')
const errors = require('../../consts/errors');

const addUser = newUser => {
    return db('users')
    .insert(newUser)
    .then(id => {
        return findUserById(id[0]);
    })
    .catch(err => {
        res.status(500).json(errors.addUser);
    })
}

const findUserById = id => {
    return db('users').where({ id }).first();
  };

module.exports = {
  addUser,
  findUserById,
};
