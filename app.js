// modules .
require("dotenv").config();
const mongoose = require("mongoose");
const { Client, Intents, Message } = require("discord.js");

// handler
const commandHandler = require("./handler/commandHandler");
const incrementStats = require("./commands/incrementStats");
const User = require("./models/user");
const CommandCounter = require("./models/commandCounter");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.once("ready", () => {
  console.log("Ready");
  client.user.setActivity("Type ++help for commands!", { type: "PLAYING" });
});

client.on("messageCreate", async (msg) => {
  try {
    const { content } = msg;

    // reply to msg
    if (content.startsWith("++") || content.startsWith("--")) {
      console.log(msg.content + "##" + msg.author.username);
      const command =
        content.split("++")[1]?.split(" ")[0] ||
        content.split("--")[1]?.split(" ")[0];
      await commandHandler(msg, command);
    }
  } catch (e) {
    console.log(e);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  if (user.id === reaction.message.author.id) {
    return;
  }
  let author = await CommandCounter.findOne({ userId: user.id });
  if (!author) {
    author = await CommandCounter.create({
      userId: user.id,
      date: new Date(),
    });
  }
  const msBetweenDates = Math.abs(new Date().getTime() - author.date.getTime());
  // ️ convert ms to hours                  min  sec   ms
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
  console.log(hoursBetweenDates);

  if (hoursBetweenDates >= 1) {
    author = await CommandCounter.findOneAndUpdate(
      { userId: user.id },
      { $set: { count: 5, date: new Date() } },
      { new: true }
    );
  }
  if (author.count === 0) {
    // count the no of remaining commands
    return;
  }
  await CommandCounter.findOneAndUpdate(
    { userId: user.id },
    { $inc: { count: -1 } }
  );
  console.log(author.count);
  console.log({ ...reaction._emoji }.name.charCodeAt(0));

  // Now the message has been cached and is fully available
  console.log(
    `${reaction.message.author}'s message"${reaction.message.content}" gained a reaction!`
  );
  let statToIncrement = "";
  const emojiName = { ...reaction._emoji }.name;
  switch (emojiName) {
    case "Beta":
      statToIncrement = "downBad";
      break;
    case "chad":
      statToIncrement = "chad";
      break;
    case "manpreet":
      statToIncrement = "manpreet";
      break;
    case "smile_cry":
      statToIncrement = "wowUrSoFunny";
      break;
    case "paul":
      statToIncrement = "noCap";
      break;
    case "sad_frog":
      statToIncrement = "sad";
      break;
    case "BRUH":
      statToIncrement = "bruh";
      break;
    case "thicc_jack_ma":
      statToIncrement = "socialCredits";
      break;
    case "evan":
      statToIncrement = "hot";
      break;
    case "omaewamoushindeiru":
      statToIncrement = "bitchless";
      break;
    case "absolute_pain":
      statToIncrement = "getALife";
      break;
    case "cat_m":
      statToIncrement = "bigBrain";
      break;
  }
  let userId = reaction.message.author.id;

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
  console.log(updateStr);
});

// connect to database and start the bot
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    client.login(process.env.BOT_TOKEN);
  } catch (e) {
    console.log(e);
  }
};

start();
