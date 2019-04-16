const db = require('../../config/knexConfig');
const errors = require('../../consts/errors');

const findAdminByID = id => {
    return db('users')
    .where({ id })
    .first();
}

const updateAdmin = (id, adminUpdates) => {
    return db('users')
      .where({ id })
      .update(adminUpdates)
      .then(count => {
        return findAdminByID(id);
      })
      .catch(err => {
        res.status(500).json(errors.deleteAdmin);
      });
  };

const removeAdmin = (id) => {
  return db('users')
  .where({ id })
  .del();
}

module.exports = {
    findAdminByID,
    updateAdmin,
    removeAdmin,
}
