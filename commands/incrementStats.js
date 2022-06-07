// increment the said stats for a said user
// return the incremented stats
const validCommands = require("../handler/validIncrementCommands");
const User = require("../models/user");
const createEmbeddedMsg = require("../utils/processUser");

const updateStats = async (msg, userId, statToIncrement, symbol) => {
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
  const valueToChangeBy = () => {
    if (symbol === "+") return 1;
    return -1;
  };
  const updatedUser = await User.findOneAndUpdate(
    { userId },
    { $inc: { [updateStr]: valueToChangeBy() } },
    { new: true }
  );

  msg.channel.send({
    embeds: [createEmbeddedMsg(msg.mentions.users.first(), updatedUser)],
  });
};

module.exports = updateStats;
