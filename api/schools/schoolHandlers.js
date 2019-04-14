const db = require('../../config/knexConfig');

const findSchoolByAdminID = adminID => {
  return db('schools')
    .where({ adminID })
    .first();
};

module.exports = {
  findSchoolByAdminID,
};
