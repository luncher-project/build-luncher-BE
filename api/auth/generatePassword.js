const bcrypt = require('bcryptjs');

const generatePassword = password => {
    return bcrypt.hashSync(password, 10)
}

module.exports = generatePassword;
