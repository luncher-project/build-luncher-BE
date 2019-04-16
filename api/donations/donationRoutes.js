const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const Donation = require('./donationHandlers');
const validateDonorToken = require('../credentials/middleware/validateDonorToken');
const validateDonation = require('./middleware/validateDonation');

routes.use(express.json());

/*
[POST] Add a donation to a schools funds
Params: id of the school,
Body: {
    amount: 'integer' - in USD,
}
Headers: Authorization: valid token.
*/
routes.post(urls.donation, validateDonorToken, validateDonation, (req, res) => {
  const { schoolID } = req.params;
  const { amount } = req.body;
  const newDonation = {
    donorID: req.decodedToken.subject,
    schoolID,
    amount,
  };
  Donation.addDonation(newDonation)
    .then(donation => {
      addDonationToSchoolFunds(schoolID, amount, donation);
    })
    .catch(err => {
      res.status(500).json(errors.addDonation);
    });

  const addDonationToSchoolFunds = (schoolID, amount, donation) => {
    Donation.addDonationToSchool(schoolID, amount)
      .then(school => {
        if (school > 0) {
          sendDonationResponse(schoolID, donation);
        } else {
          res.status(500).json(errors.addDonation);
        }
      })
      .catch(err => {
        res.status(500).json(errors.addDonation);
      });
  };

  const sendDonationResponse = (schoolID, donation) => {
    Donation.findSchoolBySchoolID(schoolID)
      .then(school => {
        const fundedSchool = {
          schoolName: school.schoolName,
          fundsNeeded: school.fundsNeeded,
          fundsReceived: school.fundsReceived,
        };
        res.status(200).json({ ...donation, fundedSchool });
      })
      .catch(err => {
        res.status(500).json(errors.getSchool);
      });
  };
});

module.exports = routes;
