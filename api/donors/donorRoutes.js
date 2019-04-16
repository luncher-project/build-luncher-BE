const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const responses = require('../../consts/responses');
const Donor = require('./donorHandlers');
const validateDonorToken = require('../credentials/middleware/validateDonorToken');
const validateDonorUpdates = require('./middleware/validateDonorUpdates');
const formatDonorUpdates = require('./middleware/formateDonorUpdates');

routes.use(express.json());

/*
[PUT] Change details of donor
Params: none,
Body: at least one of the following key-value pairs{
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string' - at least 5 chars,
}
Headers: Authorization: valid token.
Note: id, role, and donations cannot be updated by donors
*/
routes.put(
  urls.donor,
  validateDonorToken,
  validateDonorUpdates,
  formatDonorUpdates,
  (req, res) => {
    const id = req.decodedToken.subject;
    const donorUpdates = req.body;
    Donor.updateDonor(id, donorUpdates)
      .then(donor => {
        delete donor.password;
        res.status(200).json(donor);
      })
      .catch(err => {
        res.status(500).json(errors.updateDonor);
      });
  },
);

/*
[DELETE] Remove donor
Params: none,
Body: none,
Headers: Authorization: valid token.
*/
routes.delete(urls.donor, validateDonorToken, (req, res) => {
  const id = req.decodedToken.subject;
  Donor.findDonorByID(id)
    .then(donor => {
      delete donor.password;
      donor.message = responses.deletedDonor;
      const deletedDonor = donor;
      removeDonor(deletedDonor);
    })
    .catch(err => {
      res.status(500).json(errors.getDonor);
    });

  const removeDonor = deletedDonor => {
    Donor.removeDonor(id)
      .then(count => {
        res.status(200).json(deletedDonor);
      })
      .catch(err => {
        res.status(500).json(errors.deleteDonor);
      });
  };
});

module.exports = routes;
