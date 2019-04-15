const errors = require('../../../consts/errors');

const validateDonation = (req, res, next) => {
  const { amount } = req.body;
  if (!amount || amount <= 0 || typeof amount !== 'number') {
    res.status(400).json(errors.donationFormat);
  } else {
    next();
  }
};

module.exports = validateDonation;
