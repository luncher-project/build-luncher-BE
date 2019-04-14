const db = require('../../config/knexConfig');
const errors = require('../../consts/errors');

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

const findAssociatedDonations = schoolID => {
  return db('donations')
    .select(
      'donations.id as donationID',
      'donations.created_at as date',
      'donations.amount',
      'users.email as donorContact',
    )
    .where({ schoolID })
    .from('donations')
    .innerJoin('users', 'donations.donorID', 'users.id');
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

module.exports = {
  findSchoolByAdminID,
  addSchool,
  findAssociatedDonations,
  updateSchool,
};
