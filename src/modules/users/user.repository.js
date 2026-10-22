
const User = require("./user.model");

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const create = async ({ name, email, password }) => {
  return User.create({
    name,
    email,
    password
  });
};

module.exports = {
  findByEmail,
  create
};
