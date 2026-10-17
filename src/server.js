
const mongoose = require("mongoose");

const app = require("./app");
const config = require("./config/env");
const connectDB = require("./database/connect");

const startServer = async () => {
  await connectDB(config.mongoUri);

  const server = app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });

  server.on("error", (error) => {
    console.error(
      "HTTP server error:",
      error.code || error.name
    );

    process.exitCode = 1;
  });

  let isShuttingDown = false;

  const shutdown = (signal) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;

    console.log(`Received ${signal}; shutting down.`);

    server.close(async (error) => {
      try {
        await mongoose.disconnect();
      } catch (disconnectError) {
        console.error(
          "Database disconnection failed:",
          disconnectError.name
        );

        process.exitCode = 1;
      }

      if (error) {
        console.error(
          "HTTP server shutdown failed:",
          error.name
        );

        process.exitCode = 1;
      }
    });
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
};

startServer().catch((error) => {
  console.error(
    "Application startup failed:",
    error.name || "Error"
  );

  process.exitCode = 1;
});
