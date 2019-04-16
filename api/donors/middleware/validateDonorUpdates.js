const errors = require('../../../consts/errors');

const validateDonorUpdates = (req, res, next) => {
    const { id, firstName, lastName, email, password, role, donations  } = req.body;
    if(id || role || donations) {
        res.status(400).json(errors.invalidDonorUpdate);
    } 
    else if (!firstName && !lastName && !email && !password) {
        res.status(400).json(errors.noChangesRequested);
    }
    else {
        next();
    }
}

module.exports = validateDonorUpdates;
