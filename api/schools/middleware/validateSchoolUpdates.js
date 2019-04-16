const errors = require('../../../consts/errors');

const validateSchoolUpdates = (req, res, next) => {
    const { id, schoolName, state, zip, fundsNeeded, fundsReceived, adminID  } = req.body;
    if(fundsReceived || id || adminID) {
        res.status(400).json(errors.invalidSchoolUpdate);
    } 
    else if (!schoolName && !state && !zip && !fundsNeeded) {
        res.status(400).json(errors.noChangesRequested);
    }
    else {
        next();
    }
}

module.exports = validateSchoolUpdates;
