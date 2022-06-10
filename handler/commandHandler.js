const validIncrementCommands = require("./validIncrementCommands");
const incrementStats = require("../commands/incrementStats");
const createEmbeddedMsg = require("../utils/processUser");
const User = require("../models/user");
const CommandCounter = require("../models/commandCounter");

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
      console.log(msg.author.id);
      let author = await CommandCounter.findOne({ userId: msg.author.id });
      if (!author) {
        author = await CommandCounter.create({
          userId: msg.author.id,
          date: new Date(),
        });
      }
      const msBetweenDates = Math.abs(
        new Date().getTime() - author.date.getTime()
      );
      // ️ convert ms to hours                  min  sec   ms
      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
      if (hoursBetweenDates >= 1) {
        author = await CommandCounter.findOneAndUpdate(
          { userId: msg.author.id },
          { $set: { count: 5, date: new Date() } },
          { new: true }
        );
      }
      if (author.count === 0) {
        // count the no of remaining commands
        msg.reply(
          "Of all the things, you could have done with your time, you chose to abuse a bot.\nTake a moment and think about it. Do better.\n" +
            "Your limit will reset after 1 hour"
        );
        return;
      }
      await CommandCounter.findOneAndUpdate(
        { userId: msg.author.id },
        { $inc: { count: -1 } }
      );
      await incrementStats(msg, id, command, symbol);
    }
  }
};

module.exports = commandHandler;
