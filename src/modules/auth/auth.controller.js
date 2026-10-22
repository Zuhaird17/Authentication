
const authService = require("./auth.service");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(
      req.registrationInput
    );

    return res.status(201).json({
      data: {
        user
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerUser
};
