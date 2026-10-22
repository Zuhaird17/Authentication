
const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  await mongoose.connect(mongoUri);

  console.log("MongoDB connection established.");
};

module.exports = connectDB;
