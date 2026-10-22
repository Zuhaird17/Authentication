
const express = require("express");

const {
  validateRegistration
} = require("./auth.validation");

const {
  registerUser
} = require("./auth.controller");

const router = express.Router();

router.post(
  "/register",
  validateRegistration,
  registerUser
);

module.exports = router;
