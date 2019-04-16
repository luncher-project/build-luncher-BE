const errors = require('../../../consts/errors');

const validateSchoolFields = (req, res, next) => {
    const { schoolName, state, zip  } = req.body;
    if(schoolName && state && zip) {
        next();
    } else {
        res.status(400).json(errors.invalidSchool);
    }
}

module.exports = validateSchoolFields;
