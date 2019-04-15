const generatePassword = require('../../auth/generatePassword');

const formatAdminUpdates = (req, res, next) => {
  const adminUpdates = req.body;
  if (adminUpdates.firstName) {
    adminUpdates.firstName = adminUpdates.firstName
      .toLowerCase()
      .replace(/\b([a-z])/gi, char => char.toUpperCase());
  }
  if (adminUpdates.lastName) {
    adminUpdates.lastName = adminUpdates.lastName
      .toLowerCase()
      .replace(/\b([a-z])/gi, char => char.toUpperCase());
  }
  if (adminUpdates.email) {
    adminUpdates.email = adminUpdates.email.toLowerCase();
  }
  if (adminUpdates.password) {
    adminUpdates.password = generatePassword(adminUpdates.password);
  }
  req.body = { ...adminUpdates };
  next();
};

module.exports = formatAdminUpdates;
