const validateUser = user => {
  if (
    user.firstName &&
    user.lastName &&
    user.email &&
    user.password &&
    user.password.length > 5 &&
    (user.role === 'admin' || user.role === 'donor')
  ) {
    return true;
  }
};

module.exports = validateUser;
