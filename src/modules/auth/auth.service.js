
const userRepository = require("../users/user.repository");
const AppError = require("../../utils/app-error");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError(
      "User with this email already exists.",
      409
    );
  }

  try {
    const user = await userRepository.create({
      name,
      email,
      password
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    };
  } catch (error) {
    // MongoDB duplicate-key error.
    // The unique index remains the final authority.
    if (error.code === 11000) {
      throw new AppError(
        "User with this email already exists.",
        409
      );
    }

    throw error;
  }
};

module.exports = {
  registerUser
};
