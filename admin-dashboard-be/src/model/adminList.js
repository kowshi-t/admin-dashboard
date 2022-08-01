const mongoose = require("mongoose");

const adminList = mongoose.model(
  "adminList",
  new mongoose.Schema({}, { timestamps: true })
);

module.exports = adminList;
