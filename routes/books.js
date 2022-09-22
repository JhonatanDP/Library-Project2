const express = require("express");
const router = express.Router();
const booksController = require('../controllers/books');
const sessionChecker = require('../middleware/auth');

router.get("/", booksController.getBooks);

router.get('/add-book', booksController.addBookUIPage);

router.post("/add-book", booksController.addBook);

module.exports = router;
