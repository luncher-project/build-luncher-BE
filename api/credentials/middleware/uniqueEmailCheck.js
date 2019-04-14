const Register = require('../registerHandlers');
const errors = require('../../../consts/errors');

const uniqueEmailCheck = (req, res, next) => {
  const newUserEmail = req.body.email;
  Register.getEmails()
    .then(emails => {
      const filteredEmails = emails.filter(email => email.email === newUserEmail);
      if (filteredEmails.length > 0) {
        res.status(400).json(errors.existingEmail);
      } else {
        next();
      }
    })
    .catch(err => res.status(500).json(errors.getEmails));
};

module.exports = uniqueEmailCheck;
