const validIncrementCommands = require("./validIncrementCommands");
const incrementStats = require("../commands/incrementStats");
const createEmbeddedMsg = require("../utils/processUser");
const User = require("../models/user");

const commandHandler = async (msg, command) => {
  // check if [stat] command is present
  if (command === "stat") {
    // check other user's stats
    let myUser = null;
    if (msg.mentions.users.first()) {
      const { id } = msg.mentions.users.first();
      myUser = await User.findOne({ userId: id });
      if (!myUser) {
        myUser = await await User.create({ userId: id, stats: {} });
      }

      msg.channel.send({
        embeds: [createEmbeddedMsg(msg.mentions.users.first(), myUser)],
      });
      return;
    }
    // respond with user stats
    // find the user if it doesn't exist create one
    myUser = await User.findOne({ userId: msg.author.id });
    if (!myUser) {
      myUser = await User.create({ userId: msg.author.id, stats: {} });
    }

    msg.channel.send({
      embeds: [createEmbeddedMsg(msg.author, myUser)],
    });
  }

  // increment stats if
  // id and increment command both are present
  if (msg.mentions.users.first()) {
    const symbol = msg.content[0];
    const { id } = msg.mentions.users.first();
    if (validIncrementCommands[command] && id) {
      await incrementStats(msg, id, command, symbol);
    }
  }
};

module.exports = commandHandler;
