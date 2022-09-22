const express = require('express');
const router = express.Router();
router.use(require('./booksRoutes'));

module.exports = router;