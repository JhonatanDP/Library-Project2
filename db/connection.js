const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    dialect: process.env.MYSQL_DIALECT,
    host: process.env.MYSQL_HOST,
  }
);

module.exports = sequelize;
