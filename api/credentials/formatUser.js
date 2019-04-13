const generatePassword = require('../auth/generatePassword');

const formatUser = user => {
  const formattedUser = user;
  const formattedFirstName = formattedUser.firstName
    .toLowerCase()
    .replace(/\b([a-z])/gi, char => char.toUpperCase());
  const formattedLastName = formattedUser.lastName
    .toLowerCase()
    .replace(/\b([a-z])/gi, char => char.toUpperCase());
  const formattedEmail = formattedUser.email.toLowerCase();
  const formattedRole = formattedUser.role.toLowerCase();
  const hashedPassword = generatePassword(formattedUser.password);

  return {
    firstName: formattedFirstName,
    lastName: formattedLastName,
    email: formattedEmail,
    password: hashedPassword,
    role: formattedRole,
  };
};

module.exports = formatUser;
