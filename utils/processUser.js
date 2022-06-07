const embed = require("./embeddedMsg");

const createKey = (key) => {
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
    case "hot":
      key = ":hot_face: " + key;
      break;
    case "sad":
      key = "<:sad_frog:955711721459310592> " + key;
      break;
    case "bruh":
      key = "<:BRUH:921583749177696337> " + key;
      break;
    case "socialCredits":
      key = "<:thicc_jack_ma:902440456674218044> " + key;
      break;
  }
  return key;
};

const createEmbeddedMsg = (user, foundUser) => {
  const myEmbeds = [];
  const data = JSON.parse(JSON.stringify(foundUser.stats));
  for (let [key, value] of Object.entries(data)) {
    key = createKey(key);
    if (key !== "_id")
      myEmbeds.push({ name: key, value: value.toString(), inline: true });
  }
  return embed(user, myEmbeds);
};
module.exports = createEmbeddedMsg;
