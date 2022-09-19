const express = require('express');
const router = express.Router();

router.use(require('./booksRoutes'));
//router.use(require('./authorRoutes'));
//router.use(require('./locationRoutes'));

module.exports = router;