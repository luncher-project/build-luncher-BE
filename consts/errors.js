const errors = {
  getSchools: {
    message: 'There was an error retrieving schools',
  },
  invalidUser: {
    message:
      'Please provide a valid user with firstName, lastName, email, password, and role as per the API docs',
  },
  addUser: {
    message: 'The user could not be added to the database',
  },
  getEmails: {
    message: 'There was an error retrieving emails',
  },
  existingEmail: {
    message: 'An account with this email already exists',
  },
  loginUser: {
    message: 'There was an error logging in the user',
  },
  invalidCredentials: {
    message: 'Please provide a user with valid credentials',
  },
  getDonations: {
    message: 'There was an error retrieving donations',
  },
  noToken: {
    message: 'This is a protected route, please supply a valid token',
  },
  getSchool: {
    message: 'The school for this admin could not be retrieved',
  },
  noSchoolAssociated: {
    message: 'There is no school associated with this admin',
  },
  invalidSchool: {
    message:
      'Please provide a valid school with schoolName, state, and zip as per the API docs',
  },
  addSchool: {
    message: 'The school could not be added to the database',
  },
  invalidSchoolUpdate: {
    message: 'Admins cannot make these changes to school information',
  },
  noChangesRequested: {
    message:
      'Please provide at least one change request for schoolName, state, zip, or fundsNeeded',
  },
  updateSchool: {
    message: 'The school could not be updated in the database',
  },
};

module.exports = errors;
