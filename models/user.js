const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  chad: { type: Number, default: 0 },
  manpreet: { type: Number, default: 0 },
  wowUrSoFunny: { type: Number, default: 0 },
  downBad: { type: Number, default: 0 },
  noCap: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "must provide a user id"],
  },
  stats: statSchema,
});

const user = mongoose.model("user", userSchema);
module.exports = user;
