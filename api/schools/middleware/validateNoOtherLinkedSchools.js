const errors = require('../../../consts/errors');
const School = require('../schoolHandlers');

const validateNoOtherLinkedSchools = (req, res, next) => {
  const id = req.decodedToken.subject;
  School.findSchoolByAdminIDArr(id)
    .then(school => {
      if (school.length) {
        res.status(400).json(errors.secondSchool);
      } else {
        next();
      }
    })
};

module.exports = validateNoOtherLinkedSchools;
