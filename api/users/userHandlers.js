const db = require('../../config/knexConfig');

const getSchools = () => {
  return db('schools')
    .select(
      'schools.id',
      'schools.schoolName',
      'schools.state',
      'schools.zip',
      'schools.fundsNeeded',
      'users.email as contact',
    )
    .from('schools')
    .innerJoin('users', 'schools.adminID', 'users.id');
};

const getSchoolByID = id => {
  return db('schools')
    .select(
      'schools.schoolName',
      'schools.state',
      'schools.zip',
      'schools.fundsNeeded',
      'users.email as contact',
    )
    .from('schools')
    .where('schools.id', id)
    .innerJoin('users', 'schools.adminID', 'users.id')
    .first();
};

module.exports = {
  getSchools,
  getSchoolByID,
};
