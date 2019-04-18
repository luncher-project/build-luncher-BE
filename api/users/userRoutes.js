const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const Users = require('./userHandlers');

routes.use(express.json());

/*
[GET] Get a list of schools in need  of donations
Params: none,
Body: none,
*/
routes.get(urls.schools, (req, res) => {
  Users.getSchools()
    .then(schools => {
      res.status(200).json(schools);
    })
    .catch(err => {
      res.status(500).json(errors.getSchools);
    });
});

/*
[GET] Get a single school by its id
Params: schoolID,
Body: none,
*/
routes.get(urls.schoolByID, (req, res) => {
  const { id } = req.params;
  Users.getSchoolByID(id)
    .then(schools => {
      if (schools) {
        res.status(200).json(schools);
      } else {
        res.status(400).json(errors.noSchool);
      }
    })
    .catch(err => {
      res.status(500).json(errors.getSchools);
    });
});

module.exports = routes;
