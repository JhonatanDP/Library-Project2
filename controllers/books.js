const Sequelize = require("sequelize");
const Book = require("../models/book");
const Op = Sequelize.Op;
const inputCheck = require("../utils/inputCheck");

exports.getBooks = async (req, res, next) => {
  const searchTerm = req.query.search;
  const searchTermInt = parseInt(req.query.search);
  let books = [];
  try {
    let orQuery = {
      title: { [Op.substring]: searchTerm },
      author_name: { [Op.substring]: searchTerm },
    };

    if (!isNaN(searchTermInt)) {
      orQuery = {
        ...orQuery,
        id: searchTermInt,
        code: searchTermInt,
      };
    }

    if (searchTerm && searchTerm.trim()) {
      books = await Book.findAll({
        where: { [Op.or]: orQuery },
      });
    } else {
      books = await Book.findAll();
    }
  } catch (error) {
    console.log(error);
  }
  const booksUI = books.map((book) => book.dataValues);

  res.render("home", {
    prods: booksUI,
    pageTitle: "Library",
    path: "/",
    hasProducts: booksUI.length > 0,
    activeShop: true,
    productCSS: true,
    searchTerm: searchTerm || "",
    isLoggedIn: !!req.session.user,
    isNotLoggedIn: !req.session.user
  });
};

exports.addBook = async (req, res, next) => {
  const { body } = req;
  const errors = inputCheck(
    body,
    "title",
    "code",
    "author_name",
    "isle",
    "row_letter"
  );
  // if (errors) {
  //   res.status(400).json({ error: errors });
  //   return;
  // }

  const { title, code, author_name, isle, row_letter } = body;
  const resultBook = await Book.create({
    title,
    code,
    author_name,
    isle,
    row_letter,
  });
  res.redirect("/");
};

exports.addBookUIPage = (req, res, next) => {
  res.render("add-book", {
    pageTitle: "Add Book",
    path: "/add-book",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
