const Sequelize = require("sequelize");
const User = require("../models/user");
const Op = Sequelize.Op;
const inputCheck = require("../utils/inputCheck");

exports.signup = async (req, res, next) => {
  res.render("signup", {
    pageTitle: "Signup",
    path: "/signup",
    signupCSS: true
  });
};

exports.signupPost = async (req, res, next) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      req.session.user = user.dataValues;
      res.redirect("/");
    })
    .catch((error) => {
      res.redirect("/signup", {
        pageTitle: "Signup",
        path: "/signup",
      });
    });
};

exports.login = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
    path: "/login",
    loginCSS: true
  });
};

exports.loginPost = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ where: { username: username } }).then(function (user) {
    if (!user) {
      res.redirect("/login", {
        pageTitle: "Login",
        path: "/login",
      });
    } else if (!user.validPassword(password)) {
      res.redirect("/login", {
        pageTitle: "Login",
        path: "/login",
      });
    } else {
      req.session.user = user.dataValues;
      res.redirect("/");
    }
  }).catch(error => {
    console.log(error);
    res.redirect("/");
  });
};

exports.logout = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};
