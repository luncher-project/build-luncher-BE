const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const responses = require('../../consts/responses');
const School = require('./schoolHandlers');
const validateAdminToken = require('../credentials/middleware/validateAdminToken');
const validateNoOtherLinkedSchools = require('./middleware/validateNoOtherLinkedSchools');
const validateSchoolFields = require('./middleware/validateSchoolFields');
const formatSchool = require('./middleware/formatSchool');
const validateSchoolUpdates = require('./middleware/validateSchoolUpdates');
const formatSchoolUpdates = require('./middleware/formatSchoolUpdates');

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
        School.findAssociatedDonations(school.id).then(donations => {
          if (donations.length) {
            school.donations = donations;
            res.status(200).json(school);
          } else {
            school.message = responses.noSchoolDonations;
            res.status(200).json(school);
          }
        });
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
    fundsReceived: 'integer',  - set to 0 by default every time,
}
Headers: Authorization: valid token.
*/
routes.post(
  urls.school,
  validateAdminToken,
  validateNoOtherLinkedSchools,
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

/*
[PUT] Change school details as an admin
Params: none,
Body: at least one of the following key-value pairs{
    schoolName: 'string',
    state: 'string' - post abbreviation with 2 chars,
    zip: 'integer',
    fundsNeeded: 'integer',  - optional, set to 0 by default,
}
Headers: Authorization: valid token.
Note: fundsReceived cannot be updated by admin
*/
routes.put(
  urls.school,
  validateAdminToken,
  validateSchoolUpdates,
  formatSchoolUpdates,
  (req, res) => {
    const adminID = req.decodedToken.subject;
    const schoolUpdates = req.body;
    School.updateSchool(adminID, schoolUpdates)
      .then(school => {
        res.status(201).json(school);
      })
      .catch(err => {
        res.status(500).json(errors.updateSchool);
      });
  },
);

/*
[DELETE] Remove school
Params: none,
Body: none,
Headers: Authorization: valid token.
*/
routes.delete(urls.school, validateAdminToken, (req, res) => {
  const id = req.decodedToken.subject;
  School.findSchoolByAdminID(id)
    .then(school => {
      school.message = responses.deletedSchool;
      const deletedSchool = school;
      removeSchool(deletedSchool);
    })
    .catch(err => {
      res.status(500).json(errors.getSchool);
    });

  const removeSchool = deletedSchool => {
    School.removeSchool(id)
      .then(count => {
        res.status(200).json(deletedSchool);
      })
      .catch(err => {
        res.status(500).json(errors.deleteSchool);
      });
  };
});

module.exports = routes;
