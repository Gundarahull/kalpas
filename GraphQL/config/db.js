const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/graphql_demo");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
