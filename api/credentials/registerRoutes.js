const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const Register = require('./registerHandlers');
const validateUser = require('./middleware/validateUser');
const formatUser = require('./middleware/formatUser');
const uniqueEmailCheck= require('./middleware/uniqueEmailCheck');
const generateToken = require('../auth/generateToken');

routes.use(express.json());

/* 
[POST] Add a new admin to the database
Params: none,
Body: {
    firstName: 'string' - less than 256 chars,
    lastName: 'string' - less than 256 chars,
    email: 'string',
    password: 'string' - over 5 chars,
    role: 'admin' OR 'donor,
}
*/
routes.post(urls.register, validateUser, uniqueEmailCheck, formatUser, (req, res) => {
  const newUser = req.body;
  Register.addUser(newUser)
    .then(user => {
      const token = generateToken(user);
      delete user.password;
      const resUser = { ...user, token };
      res.status(201).json(resUser);
    })
    .catch(err => {
      res.status(500).json(errors.addUser);
    });
});

module.exports = routes;
