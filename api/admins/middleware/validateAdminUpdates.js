const errors = require('../../../consts/errors');

const validateAdminUpdates = (req, res, next) => {
    const { id, firstName, lastName, email, password, role, schoolID  } = req.body;
    if(id || role || schoolID) {
        res.status(400).json(errors.invalidAdminUpdate);
    } 
    else if (!firstName && !lastName && !email && !password) {
        res.status(400).json(errors.noChangesRequested);
    }
    else {
        next();
    }
}

module.exports = validateAdminUpdates;
