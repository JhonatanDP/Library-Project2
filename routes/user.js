const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.js');

router.get("/signup", userController.signup);
router.post("/signup", userController.signupPost);

router.get('/login', userController.login);
router.post('/login', userController.loginPost);

router.get("/logout", userController.logout);

module.exports = router;
