const db = require('../../config/knexConfig');
const errors = require('../../consts/errors');

const findDonorByID = id => {
  return db('users')
    .where({ id })
    .first();
};

const updateDonor = (id, donorUpdates) => {
  return db('users')
    .where({ id })
    .update(donorUpdates)
    .then(count => {
      return findDonorByID(id);
    })
    .catch(err => {
      res.status(500).json(errors.updateDonor);
    });
};

const removeDonor = (id) => {
  return db('users')
  .where({ id })
  .del();
}

module.exports = {
  findDonorByID,
  updateDonor,
  removeDonor,
};
