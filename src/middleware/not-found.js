
const AppError = require("../utils/app-error");

const notFound = (req, res, next) => {
  next(new AppError("Resource not found.", 404));
};

module.exports = notFound;
