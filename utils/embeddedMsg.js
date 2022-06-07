// at the top of your file
const { MessageEmbed } = require("discord.js");
const { load } = require("nodemon/lib/rules");

// inside a command, event listener, etc.
const exampleEmbed = (user, fields) => {
  console.log(fields);
  return new MessageEmbed()
    .setAuthor({
      name: user.username,
      iconURL: user.avatarURL(),
    })
    .addFields([...fields]);
};

module.exports = exampleEmbed;
