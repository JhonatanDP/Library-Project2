const express = require("express");
const router = express.Router();
// const db = require("../../db/connection");
const Sequelize = require("sequelize");
const Book = require("../../models/book");
const Op = Sequelize.Op;

const inputCheck = require("../../utils/inputCheck");

// Get all Books
router.get("/books", (req, res) => {
  Book.findAll()
    .then((result) => {
      console.log(result);
      res.json({
        message: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
      return;
    });
});

//Get a single book by id
router.get("/book/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((result) => {
      console.log(result);
      res.json({
        message: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
      return;
    });
});

router.get("/book/code/:code", (req, res) => {
  Book.findOne({ where: { code: req.params.code } })
    .then((result) => {
      console.log(result);
      res.json({
        message: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
      return;
    });
});

//Get a single book by title
router.get("/book/title/:title", (req, res) => {
  Book.findAll({ where: { title: { [Op.substring]: req.params.title } } })
    .then((result) => {
      console.log(result);
      res.json({
        message: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
      return;
    });
});

// Create a book
router.post("/book", (req, res) => {
  const { body } = req;
  const errors = inputCheck(
    body,
    "title",
    "code",
    "author_name",
    "isle",
    "row_letter"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const { title, code, author_name, isle, row_letter } = body;
  Book.create({
    title,
    code,
    author_name,
    isle,
    row_letter,
  })
    .then((result) => {
      res.json({
        message: "success",
        data: body,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: err.message });
      return;
    });
});


module.exports = router;
