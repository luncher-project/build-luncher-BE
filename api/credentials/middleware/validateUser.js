const errors = require('../../../consts/errors');

const validateUser = (req, res, next) => {
    const user = req.body;
    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.password &&
      user.password.length > 5 &&
      (user.role === 'admin' || user.role === 'donor')
    ) {
      next();
    } else {
        res.status(401).json(errors.invalidUser)
    }
  };
  
  module.exports = validateUser;
