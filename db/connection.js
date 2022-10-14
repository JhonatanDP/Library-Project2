const Sequelize = require("sequelize");
require('dotenv').config();

let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.MYSQL_DATABASE_NAME,
        process.env.MYSQL_USERNAME,
        process.env.MYSQL_PASSWORD,
        {
          dialect: process.env.MYSQL_DIALECT,
          host: process.env.MYSQL_HOST,
        }
      );
}
module.exports = sequelize;




// const sequelize = new Sequelize(
//   process.env.MYSQL_DATABASE_NAME,
//   process.env.MYSQL_USERNAME,
//   process.env.MYSQL_PASSWORD,
//   {
//     dialect: process.env.MYSQL_DIALECT,
//     host: process.env.MYSQL_HOST,
//   }
// );
