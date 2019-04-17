const db = require('../../config/knexConfig');
const errors = require('../../consts/errors');

const findSchoolByAdminID = adminID => {
  return db('schools')
    .where({ adminID })
    .first();
};

const findSchoolByAdminIDArr = adminID => {
  return db('schools')
    .where({ adminID });
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

const findAssociatedDonations = schoolID => {
  return db('donations')
    .select(
      'id as donationID',
      'created_at as date',
      'amount',
    )
    .where({ schoolID });
};

const updateSchool = (adminID, schoolUpdates) => {
  return db('schools')
    .where({ adminID })
    .update(schoolUpdates)
    .then(count => {
      return findSchoolByAdminID(adminID);
    })
    .catch(err => {
      res.status(500).json(errors.updateSchool);
    });
};

const removeSchool = (adminID) => {
  return db('schools')
  .where({ adminID })
  .del();
}

module.exports = {
  findSchoolByAdminID,
  findSchoolByAdminIDArr,
  addSchool,
  findAssociatedDonations,
  updateSchool,
  removeSchool,
};
