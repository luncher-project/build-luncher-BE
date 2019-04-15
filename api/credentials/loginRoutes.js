const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const responses = require('../../consts/responses');
const Login = require('./loginHandlers');
const validateLoginFields = require('./middleware/validateLoginFields');
const generateToken = require('../auth/generateToken');

routes.use(express.json());

/* 
[POST] Login as an admin or donor
Params: none,
Body: {
    email: 'string',
    password: 'string',
    email and password must match those listen in the databse from registration/account changes
}
*/
routes.post(urls.login, validateLoginFields, (req, res) => {
  const { email, password } = req.body;
  Login.findUserByEmail(email)
    .then(user => {
      if (user.length) {
        [user] = user;
        if (bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          delete user.password;
          if (user.role === 'donor') {
            donorLogin(user, token);
          } else {
            adminLogin(user, token);
          }
        } else {
          res.status(401).json(errors.invalidCredentials);
        }
      } else {
        res.status(401).json(errors.invalidCredentials);
      }
    })
    .catch(err => {
      res.status(500).json(errors.loginUser);
    });

  const adminLogin = (admin, token) => {
    Login.findAssociatedSchool(admin.id)
      .then(school => {
        if (school.length) {
          [school] = school;
          admin.schoolID = school.id;
          const resAdmin = { ...admin, token };
          res.status(200).json(resAdmin);
        } else {
          admin.message = 'no associated schools';
          res.status(200).json({ ...admin, token });
        }
      })
      .catch(err => {
        user.message = responses.noSchools;
        const resAdmin = { ...admin, token };
        res.status(200).json(resAdmin);
      });
  };

  const donorLogin = (donor, token) => {
    Login.findAssociatedDonations(donor.id)
      .then(donations => {
        if (donations.length) {
          donor.donations = donations;
          const resDonor = { ...donor, token };
          res.status(200).json(resDonor);
        } else {
          donor.message = responses.noDonations;
          res.status(200).json({ ...donor, token });
        }
      })
      .catch(err => {
        res.status(500).json(errors.getDonations);
      });
  };
});

module.exports = routes;
