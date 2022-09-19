const express = require('express');
const router = express.Router();

router.use(require('./booksaRoutes'));
router.use(require('./authorRoutes'));
router.use(require('./locationRoutes'));

module.exports = router;