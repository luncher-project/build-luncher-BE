const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const School = require('./schoolHandlers');
const validateAdminToken = require('../credentials/middleware/validateAdminToken');
const validateSchoolFields = require('./middleware/validateSchoolFields');
const formatSchool = require('./middleware/formatSchool');

routes.use(express.json());

/* 
[GET] Get the school back that the admin is associated with
Params: none,
Body: none,
Headers: Authorization: valid token,
*/
routes.get(urls.school, validateAdminToken, (req, res) => {
  const id = req.decodedToken.subject;
  School.findSchoolByAdminID(id)
    .then(school => {
      if (school) {
        res.status(200).json(school);
      } else {
        res.status(200).json(errors.noSchoolAssociated);
      }
    })
    .catch(err => {
      res.status(500).json(errors.getSchool);
    });
});

/*
[POST] Add a new school as admin
Params: none,
Body: {
    schoolName: 'string',
    state: 'string' - post abbreviation with 2 chars,
    zip: 'integer',
    fundsNeeded: 'integer',  - optional, set to 0 by default,
    fundsNeeded: 'integer',  - set to 0 by default every time,
}
Headers: Authorization: valid token.
*/
routes.post(
  urls.school,
  validateAdminToken,
  validateSchoolFields,
  formatSchool,
  (req, res) => {
    const newSchool = req.body;
    School.addSchool(newSchool)
      .then(school => {
        res.status(201).json(school);
      })
      .catch(err => {
        res.status(500).json(errors.addSchool);
      });
  },
);

module.exports = routes;
