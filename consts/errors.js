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
};

module.exports = errors;