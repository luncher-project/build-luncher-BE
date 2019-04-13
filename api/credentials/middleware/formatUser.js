const generatePassword = require('../../auth/generatePassword');

const formatUser = (req, res, next) => {
  const formattedUser = req.body;
  const formattedFirstName = formattedUser.firstName
    .toLowerCase()
    .replace(/\b([a-z])/gi, char => char.toUpperCase());
  const formattedLastName = formattedUser.lastName
    .toLowerCase()
    .replace(/\b([a-z])/gi, char => char.toUpperCase());
  const formattedEmail = formattedUser.email.toLowerCase();
  const formattedRole = formattedUser.role.toLowerCase();
  const hashedPassword = generatePassword(formattedUser.password);

  req.body = {
    firstName: formattedFirstName,
    lastName: formattedLastName,
    email: formattedEmail,
    password: hashedPassword,
    role: formattedRole,
  };

  next();
};

module.exports = formatUser;
