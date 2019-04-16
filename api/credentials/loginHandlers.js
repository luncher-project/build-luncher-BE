const db = require('../../config/knexConfig');

const findUserByEmail = email => {
  return db('users')
    .where({ email });
};

const findAssociatedSchool = adminID => {
    return db('schools')
    .where({ adminID });
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
