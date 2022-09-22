const Sequelize = require("sequelize");
const sequelize = require("../db/connection");
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// export User model for use in other files.
module.exports = User;
