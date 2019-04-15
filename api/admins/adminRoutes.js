const express = require('express');
const routes = express.Router();

const urls = require('../../consts/urls');
const errors = require('../../consts/errors');
const Admin = require('./adminHandlers');
const validateAdminToken = require('../credentials/middleware/validateAdminToken');
const valdiateAdminUpdates = require('./middleware/validateAdminUpdates');
const formatAdminUpdates = require('./middleware/formatAdminUpdates');

routes.use(express.json());

/*
[PUT] Change details of admin
Params: none,
Body: at least one of the following key-value pairs{
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string' - at least 5 chars,
}
Headers: Authorization: valid token.
Note: id, role, and schoolID cannot be updated by admin
*/
routes.post(
  urls.admin,
  validateAdminToken,
  valdiateAdminUpdates,
  formatAdminUpdates,
  (req, res) => {
    const id = req.decodedToken.subject;
    const adminUpdates = req.body;
    Admin.updateAdmin(id, adminUpdates)
      .then(admin => {
        delete admin.password;
        res.status(200).json(admin);
      })
      .catch(err => {
        res.status(500).json(errors.updateAdmin);
      });
  },
);

module.exports = routes;
