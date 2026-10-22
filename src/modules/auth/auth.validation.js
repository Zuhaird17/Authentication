
const AppError = require("../../utils/app-error");

const validateRegistration = (req, res, next) => {
  try {
    const body = req.body;

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      throw new AppError("A JSON object is required.", 400);
    }

    const { name, email, password } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      throw new AppError(
        "Name, email, and password are required as strings.",
        400
      );
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2 || normalizedName.length > 80) {
      throw new AppError(
        "Name must contain between 2 and 80 characters.",
        400
      );
    }

    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      throw new AppError("A valid email address is required.", 400);
    }

    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      throw new AppError(
        "Password must contain at least 8 characters and no more than 72 UTF-8 bytes.",
        400
      );
    }

    // Pass only recognized fields to the service.
    req.registrationInput = {
      name: normalizedName,
      email: normalizedEmail,
      password
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validateRegistration
};
