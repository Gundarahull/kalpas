const mongoose = require("mongoose");

const company = new mongoose.Schema({
  name: String,
  location: String,
});

const Company = mongoose.model("Company", company);
module.exports = Company;
