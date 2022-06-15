//
const { MessageEmbed } = require("discord.js");

// inside a command, event listener, etc.
const exampleEmbed = (user, fields) => {
  return new MessageEmbed()
    .setAuthor({
      name: user.username,
      iconURL: user.avatarURL(),
    })
    .addFields([...fields]);
};

module.exports = exampleEmbed;
