
const AppError = require("../utils/app-error");

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const isClientError =
    err instanceof AppError &&
    err.isOperational === true;

  let statusCode = isClientError ? err.statusCode : 500;
  let message = isClientError
    ? err.message
    : "An unexpected error occurred.";

  // Handle malformed JSON from express.json().
  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON request body.";
  }

  // Handle oversized JSON request bodies.
  if (err.type === "entity.too.large") {
    statusCode = 413;
    message = "Request body is too large.";
  }

  // Never expose raw internal errors to API clients.
  if (statusCode >= 500) {
    console.error("Internal server error:", err.name || "Error");
  }

  return res.status(statusCode).json({
    error: {
      message
    }
  });
};

module.exports = errorHandler;
