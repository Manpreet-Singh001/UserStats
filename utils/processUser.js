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
      key = "<:paul:962533391465582592> " + key;
      break;
    case "hot":
      key = "<:evan:957472095846158376> " + key;
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
    case "getALife":
      key = "<:absolute_pain:921256875431985183> " + key;
      break;
    case "bitchless":
      key = "<:omaewamoushindeiru:937917826952478770> " + key;
      break;
    case "bigBrain":
      key = "<:cat_m:906317107103424613> " + key;
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
