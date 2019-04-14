const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const School = require('./schoolHandlers');
const validateAdminToken = require('../credentials/middleware/validateAdminToken');

routes.use(express.json());

/* 
[GET] Login as an admin or donor
Params: none,
Body: none,
Headers: Authorization: valid token.
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

module.exports = routes;
