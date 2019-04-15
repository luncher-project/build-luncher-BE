const db = require('../../config/knexConfig');
const errors = require('../../consts/errors');

const findDonationsByID = id => {
  return db('donations')
    .where({ id })
    .first();
};

const findSchoolBySchoolID = id => {
  return db('schools')
    .where({ id })
    .first();
};

const addDonation = newDonation => {
  return db('donations')
    .insert(newDonation)
    .then(id => {
      return findDonationsByID(id[0]);
    })
    .catch(err => {
      res.status(500).json(errors.addDonation);
    });
};

const updateSchoolFundsReceived = (id, fundsReceivedChanges) => {
  return db('schools')
    .where({ id })
    .update(fundsReceivedChanges);
};

const addDonationToSchool = (id, donation) => {
  return findSchoolBySchoolID(id)
    .then(school => {
      const fundsReceivedChanges = {
        fundsReceived: school.fundsReceived + donation,
      };
      return updateSchoolFundsReceived(id, fundsReceivedChanges);
    })
    .catch(err => {
      res.status(500).json(errors.addDonation);
    });
};

module.exports = {
  findDonationsByID,
  addDonation,
  addDonationToSchool,
  findSchoolBySchoolID,
};
