const db = require('../../config/knexConfig');

const getSchools = () => {
  return db('schools')
    .select(
      'schools.schoolName',
      'schools.state',
      'schools.zip',
      'schools.fundsNeeded',
      'users.email as contact',
    )
    .from('schools')
    .innerJoin('users', 'schools.adminID', 'users.id');
};

module.exports = {
  getSchools,
};
