
const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const port = Number(process.env.PORT || 5000);
const nodeEnv = process.env.NODE_ENV || "development";

if (!mongoUri || !mongoUri.trim()) {
  throw new Error("Missing required environment variable: MONGO_URI");
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

if (!["development", "test", "production"].includes(nodeEnv)) {
  throw new Error("NODE_ENV must be development, test, or production");
}

module.exports = Object.freeze({
  mongoUri,
  port,
  nodeEnv
});
