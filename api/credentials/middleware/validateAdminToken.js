const jwt = require('jsonwebtoken');

const errors = require('../../../consts/errors');

const validateAdminToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json(errors.invalidCredentials);
      } else {
        if (decodedToken.role === 'donor') {
          res.status(400).json(errors.invalidCredentials);
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      }
    });
  } else {
    res.status(401).json(errors.noToken);
  }
};

module.exports = validateAdminToken;
