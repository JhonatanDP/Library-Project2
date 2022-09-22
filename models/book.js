const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 50],
    },
  },
  code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: [1, 10]
    }
  },
  author_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 30]
    }
  },
  isle: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  row_letter: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 5]
    },
  }

}, {
    timestamps: false
});

module.exports = Book;
