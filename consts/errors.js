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
};

module.exports = errors;
