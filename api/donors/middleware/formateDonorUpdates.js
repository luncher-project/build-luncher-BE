const generatePassword = require('../../auth/generatePassword');

const formatDonorUpdates = (req, res, next) => {
  const donorUpdates = req.body;
  if (donorUpdates.firstName) {
    donorUpdates.firstName = donorUpdates.firstName
      .toLowerCase()
      .replace(/\b([a-z])/gi, char => char.toUpperCase());
  }
  if (donorUpdates.lastName) {
    donorUpdates.lastName = donorUpdates.lastName
      .toLowerCase()
      .replace(/\b([a-z])/gi, char => char.toUpperCase());
  }
  if (donorUpdates.email) {
    donorUpdates.email = donorUpdates.email.toLowerCase();
  }
  if (donorUpdates.password) {
    donorUpdates.password = generatePassword(donorUpdates.password);
  }
  req.body = { ...donorUpdates };
  next();
};

module.exports = formatDonorUpdates;
