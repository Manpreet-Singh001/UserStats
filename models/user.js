const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  chad: { type: Number, default: 0 },
  manpreet: { type: Number, default: 0 },
  wowUrSoFunny: { type: Number, default: 0 },
  downBad: { type: Number, default: 0 },
  noCap: { type: Number, default: 0 },
  sad: { type: Number, default: 0 },
  bruh: { type: Number, default: 0 },
  socialCredits: { type: Number, default: 0 },
  hot: { type: Number, default: 0 },
  bitchless: { type: Number, default: 0 },
  getALife: { type: Number, default: 0 },
  bigBrain: { type: Number, default: 0 },
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
