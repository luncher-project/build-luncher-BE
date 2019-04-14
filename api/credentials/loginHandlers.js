const db = require('../../config/knexConfig');
const errors = require('../../consts/errors');

const findUserByEmail = email => {
  return db('users')
    .where({ email })
    .first();
};

const findAssociatedSchool = adminID => {
    return db('schools')
    .where({ adminID })
    .first();
}

const findAssociatedDonations = donorID => {
    return db('donations')
    .select('id', 'amount', 'schoolID')
    .where({ donorID });
}

module.exports = {
    findUserByEmail,
    findAssociatedSchool,
    findAssociatedDonations,
};
