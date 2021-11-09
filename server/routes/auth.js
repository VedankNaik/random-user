const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { register, login } = require("../controller/auth");

router.post(
  "/register",
  [
    check("email", "email is not valid").isEmail(),
    check("password", "password should contain atleast 3 characters").isLength({
      min: 3,
    }),
  ],
  register
);

router.post("/login", [
  check("email", "email is not valid").isEmail(),
  check("password", "password should contain atleast 3 characters").isLength({
    min: 3,
  }),
  login
]);

module.exports = router;
