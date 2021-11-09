const Sequelize = require("sequelize");
const { sequelize } = require("./dbhelper");

const Registration = sequelize.define("users", {
  username: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

exports.registration = (username, password, salt) => {
  return Registration.create({
    username: username,
    password: password,
    salt: salt,
  })
    .then((result) => {
      return "Success";
    })
    .catch((err) => {
      console.error(`Register failed: ${err}`);
      return err;
    });
};

exports.login = (username) => {
  return Registration.findOne({
    where: { username: username },
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(`Login failed: ${err}`);
      return err;
    });
};
