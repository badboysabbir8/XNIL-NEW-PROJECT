const axios = require("axios");

module.exports = {
  config: {
    name: "sing",
    version: "1.1",
    author: "Otinxsandip",
    countDown: 5,
    role: 0,
    longDescription: "voice",
    category: "ai",
    guide: {
      en: "{pn} text or reply to text"
    }
  },

  onStart: async function ({ api, event, args, getLang, message, usersData }) {
    try {
      const text = args.join(' ');
      if (!text) {
        return message.reply('please type text or reply to text');
      }
      const link = `https://sandipapi.onrender.com/music?song=${encodeURIComponent(text)}`;

      message.reply({
        body: 'here is your song',
        attachment: await global.utils.getStreamFromURL(link)
      });
    } catch (error) {
      console.error(error);
    }
  }
};