require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { engine } = require("express-handlebars");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const booksPublicRoutes = require("./routes/books");
const userPublicRoutes = require("./routes/user");
const sequelize = require("./db/connection");
const Book = require("./models/book");
const User = require("./models/user");
const PORT = process.env.PORT || 3001;

// Express middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

// Add after Express middleware
app.use(booksPublicRoutes);
app.use(userPublicRoutes);
app.use("/api", apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      "Error connecting to Sequelize for MYSQL. Please check your MYSQL Server & Database",
      error
    );
  });
