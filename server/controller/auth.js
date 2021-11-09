const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { registration, login } = require("../model/auth");

exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: "Registration failed. Enter valid email and password",
    });
  }

  const salt = uuidv4();
  const encryptPassword = crypto
    .pbkdf2Sync(password, salt, 100, 64, "sha512")
    .toString("hex");

  registration(username, encryptPassword, salt).then((result) => {
    if (result === "Success")
      return res.status(201).json({ message: "Account created" });
    else return res.status(400).json({ message: "Creation failed" });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  login(username).then((user) => {
    if (!user) return res.status(400).json({ error: "No user found" });

    const encryptPassword = crypto
      .pbkdf2Sync(password, user.dataValues.salt, 100, 64, "sha512")
      .toString("hex");

    if (user.dataValues.password !== encryptPassword)
      return res.status(401).json({ error: "Unauthorized" });

    const token = crypto
      .pbkdf2Sync(user.dataValues.username, "Logged in user", 100, 64, "sha512")
      .toString("hex");

    return res.status(200).json({ message: "Authenticated", token: token });
  });
};
