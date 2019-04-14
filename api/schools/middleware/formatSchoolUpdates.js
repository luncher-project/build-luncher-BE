const formatSchoolUpdates = (req, res, next) => {
    const schoolUpdates = req.body;
    if(schoolUpdates.name){
        schoolUpdates.name = schoolUpdates.name.toLowerCase().replace(/\b([a-z])/gi, char => char.toUpperCase());
    }
    if(schoolUpdates.state){
        schoolUpdates.state = schoolUpdates.state.toUpperCase();
    }
    req.body = { ...schoolUpdates };
    next();
  };
  
  module.exports = formatSchoolUpdates;
  