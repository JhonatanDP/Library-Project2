sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
  } else {
    console.log("NO AUTH");
    next();
  }
};

module.exports = sessionChecker;
