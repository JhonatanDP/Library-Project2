require('dotenv').config();
console.log(process.env.MYSQL_USERNAME);
const sequelize = require("./connection");
const Book = require("../models/book");

const books = [
  {
    title: "ASP.NET Core 6 and Angular",
    code: 1803239700,
    author_name: "Valerio De Santis",
    isle: 2,
    row_letter: "B",
  },
  {
    title: "JavaScript from Beginner to Professional",
    code: 1800562527,
    author_name: "Rob Percival",
    isle: 2,
    row_letter: "C",
  },
  {
    title: "Full Stack GraphQL Applications",
    code: 1617297038,
    author_name: "William Lyon",
    isle: 1,
    row_letter: "D",
  },
  {
    title: "Angular Projects",
    code: 1800205260,
    author_name: "Aristeidis Bampakos",
    isle: 5,
    row_letter: "A",
  },
  {
    title: "Learn JavaScript Quickly",
    code: 1951791479,
    author_name: "Code Quickly",
    isle: 3,
    row_letter: "M",
  },
  {
    title: "Node.js Design Patterns",
    code: 1839214112,
    author_name: "Mario Casciaro",
    isle: 4,
    row_letter: "V",
  },
  {
    title: "Node.js: Novice to Ninja",
    code: 1925836525,
    author_name: "Craig Buckler",
    isle: 9,
    row_letter: "C",
  },
  {
    title: "Express in Action",
    code: 1617292427,
    author_name: "Evan Hahn",
    isle: 8,
    row_letter: "A",
  },
  {
    title: "SQL QuickStart Guide",
    code: 1945051752,
    author_name: "Walter Shileds",
    isle: 6,
    row_letter: "B",
  },
  {
    title: "Learning MySQL",
    code: 1492085928,
    author_name: "Vinicius M. Grippa",
    isle: 7,
    row_letter: "G",
  },
];

const seedBooksDatabase = async () => {
  for (let index = 0; index < books.length; index++) {
    const book = books[index];

    const { title, code, author_name, isle, row_letter } = book;
    const isBookExists = await Book.findOne({ where: { title } });
    if (!isBookExists) {
      Book.create({
        title,
        code,
        author_name,
        isle,
        row_letter,
      })
        .then((result) => {
          console.log("ADDED BOOK:", book.title);
        })
        .catch((error) => {
          res.status(400).json({ error: err.message });
          return;
        });
    }
  }
};

sequelize
  .sync()
  .then((result) => {
    seedBooksDatabase();
  })
  .catch((error) => {
    console.log(
      "Error connecting to Sequelize for MYSQL. Please check your MYSQL Server & Database",
      error
    );
  });
