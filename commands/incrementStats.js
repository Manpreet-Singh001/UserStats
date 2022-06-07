// increment the said stats for a said user
// return the incremented stats
const validCommands = require("../handler/validIncrementCommands");
const User = require("../models/user");
const embed = require("../utils/embeddedMsg");

const incrementStats = async (msg, userId, statToIncrement) => {
  // if not a valid stat to increment return
  if (!validCommands[statToIncrement]) {
    console.log("pls enter a valid stat");
    return;
  }

  // find the user if it doesn't exist create one
  let currentUser = await User.findOne({ userId });
  if (!currentUser) {
    await User.create({ userId, stats: {} });
  }

  // update the required stats
  const updateStr = "stats." + statToIncrement;
  const updatedUser = await User.findOneAndUpdate(
    { userId },
    { $inc: { [updateStr]: 1 } },
    { new: true }
  );

  const myEmbeds = [];
  const data = JSON.parse(JSON.stringify(updatedUser.stats));
  for (let [key, value] of Object.entries(data)) {
    switch (key) {
      case "chad":
        key = "<:chad:936868374288420875> " + key;
        break;
      case "manpreet":
        key = "<:manpreet:888125266910670868> " + key;
        break;
      case "wowUrSoFunny":
        key = "<:smile_cry:900558625783808080> " + key;
        break;
      case "downBad":
        key = "<:Beta:888125222820130836> " + key;
        break;
      case "noCap":
        key = ":no_entry_sign::billed_cap: " + key;
        break;
    }
    if (key !== "_id") myEmbeds.push({ name: key, value: value.toString() });
  }
  msg.channel.send({
    embeds: [embed(msg.mentions.users.first(), myEmbeds)],
  });
};

module.exports = incrementStats;
