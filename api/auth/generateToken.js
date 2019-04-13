const jwt = require('jsonwebtoken');

const generateToken = user => {
    const payload = {
        subject: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.email,
        role: user.role,
    }
    const options = {
        expiresIn: '1d',
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options)
    return token;
}

module.exports = generateToken;
