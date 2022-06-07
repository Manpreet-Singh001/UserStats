const validIncrementCommands = require("./validIncrementCommands");
const incrementStats = require("../commands/incrementStats");
const embed = require("../utils/embeddedMsg");
const User = require("../models/user");

const commandHandler = async (msg, command) => {
  // check if [stat] command is present
  if (command === "stat") {
    // respond with user stats
    // find the user if it doesn't exist create one
    let myUser = await User.findOne({ userId: msg.author.id });
    if (!myUser) {
      await User.create({ userId: msg.author.id, stats: {} });
    }

    const currentUser = await User.findOne({ userId: msg.author.id });

    const myEmbeds = [];
    const data = JSON.parse(JSON.stringify(currentUser.stats));
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
      embeds: [embed(msg.author, myEmbeds)],
    });
  }

  // increment stats if
  // id and increment command both are present
  if (msg.mentions.users.first()) {
    const { id, username } = msg.mentions.users.first();
    if (validIncrementCommands[command] && id) {
      await incrementStats(msg, id, command);
    }
  }
};

module.exports = commandHandler;
