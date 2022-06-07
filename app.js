// modules
require("dotenv").config();
const mongoose = require("mongoose");
const { Client, Intents } = require("discord.js");

// handler
const commandHandler = require("./handler/commandHandler");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log("Ready");
  client.user.setActivity("Type ++help for commands!", { type: "PLAYING" });
});

client.on("messageCreate", async (msg) => {
  try {
    const { content } = msg;

    // reply to msg
    if (content.startsWith("++")) {
      const command = content.split("++")[1].split(" ")[0];
      await commandHandler(msg, command);
    }
  } catch (e) {
    console.log(e);
  }
});

// connect to database and start the bot
const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  client.login(process.env.BOT_TOKEN);
};

start();
