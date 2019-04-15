const errors = {
  getSchools: {
    message: 'There was an error retrieving schools',
  },
  getSchool: {
    message: 'There was an error retrieving the school',
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
    message: 'Please provide at least one valid change request',
  },
  updateSchool: {
    message: 'The school could not be updated in the database',
  },
  invalidAdminUpdate: {
    message: 'Admins cannot make these changes to their information',
  },
  invalidDonorUpdate: {
    message: 'Donor cannot make these changes to their information',
  },
  updateAdmin: {
    message: 'The admin could not be updated in the database',
  },
  updateDonor: {
    message: 'The donor could not be updated in the database',
  },
  addDonation: {
    message: 'The donation could not be added to the database',
  },
  donationFormat: {
    message: 'A donation amount must be supplied above zero, as an integer, and without a currency prefix',
  },
};

module.exports = errors;
