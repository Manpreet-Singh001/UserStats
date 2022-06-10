const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  userId: { type: String, required: [true, "please provide a user id"] },
  date: { type: Date, required: [true, "Please provide a date"] },
  count: { type: Number, default: 5 },
});

const counter = mongoose.model("counter", counterSchema);

module.exports = counter;
