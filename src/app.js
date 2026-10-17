
const express = require("express");

const authRoutes = require("./modules/auth/auth.routes");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.disable("x-powered-by");

app.use(express.json({
  limit: "10kb"
}));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running."
  });
});

app.use("/api/auth", authRoutes);

// Keep these after all application routes.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
