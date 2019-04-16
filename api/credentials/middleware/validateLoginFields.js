const errors = require('../../../consts/errors');

const validateLoginFields = (req, res, next) => {
    const { email, password } = req.body;
    if(email && password) {
        next();
    } else {
        res.status(400).json(errors.invalidCredentials);
    }
}

module.exports = validateLoginFields;
