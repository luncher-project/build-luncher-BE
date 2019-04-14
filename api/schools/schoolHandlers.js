const db = require('../../config/knexConfig');

const findSchoolByAdminID = adminID => {
  return db('schools')
    .where({ adminID })
    .first();
};

const addSchool = newSchool => {
  return db('schools')
    .insert(newSchool)
    .then(id => {
      return findSchoolById(id[0]);
    })
    .catch(err => {
      res.status(500).json(errors.addSchool);
    });
};

const findSchoolById = id => {
  return db('schools')
    .where({ id })
    .first();
};

module.exports = {
  findSchoolByAdminID,
  addSchool,
};
