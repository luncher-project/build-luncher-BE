const formatSchool = (req, res, next) => {
  const associatedAdmin = req.decodedToken.subject;
  const formattedSchool = req.body;
  const formattedSchoolName = formattedSchool.schoolName
    .toLowerCase()
    .replace(/\b([a-z])/gi, char => char.toUpperCase());
  const formattedState = formattedSchool.state.toUpperCase();
  const fundsNeeded = formattedSchool.fundsNeeded || 0;

  req.body = {
    schoolName: formattedSchoolName,
    state: formattedState,
    zip: formattedSchool.zip,
    fundsNeeded,
    fundsReceived: 0,
    adminID: associatedAdmin,
  };

  next();
};

module.exports = formatSchool;
