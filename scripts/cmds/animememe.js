const fetch = require("node-fetch");
const fs = require("fs-extra");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "animeme",
    version: "1.0",
    author: "SiAM",
    countDown: 40,
    role: 0,
    shortDescription: {
      vi: "get random anime meme",
      en: "get random anime memes"
    },
    longDescription: {
      vi: "get random anime meme",
      en: "get random anime memes"
    },
    category: "fun",
    guide: {
      vi: "{pn}",
      en: "{pn}"
    }
  },

  onStart: async function ({ api, args, message, event }) {

                const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);  

    try {
      const res = await fetch("https://api.zahwazein.xyz/randomanime/animeme?apikey=zenzkey_39d3262a9354");
      const data = await res.json();

      if (data.status === "OK") {
        const cap = data.result.caption;
        const img = data.result.image;
    const Stream = await getStreamFromURL(img);
        message.reply({
          body: cap,
          attachment: Stream
        });
      } else {
        message.reply("Sussy Baka 🗿\ndo it again......");
      }
    } catch (error) {
      console.error(error);
      message.reply("Api isn't responding....");
    }
  }
};