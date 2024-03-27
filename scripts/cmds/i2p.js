const axios = require('axios');
module.exports = {
  config: {
    name: "i2p",
    version: "1.1",
    author: "69",
    countDown: 5,
    role: 0,
    guide: { en: "{pn} <prompt>" },
    longDescription: {
      en: "Converts an image to a prompt."
    },
    category: "image"
  },
onStart: async function ({ message, event, args, api }) {
  try {
    const khankirChele = args.join(" ");
    let imageUrl;

    if (event.type === "message_reply") {
      if (["photo", "sticker"].includes(event.messageReply.attachments[0]?.type)) {
        imageUrl = event.messageReply.attachments[0].url;
      } else {
        return api.sendMessage({ body: "❌ | Reply must be an image." }, event.threadID);
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else if (!error) {
      return api.sendMessage({ body: "❌ | Reply to an image or provide a prompt." }, event.threadID);
    }

    if (imageUrl) {
      const response = await axios.get(`https://www.api.vyturex.com/describe?url=${encodeURIComponent(imageUrl)}`);
      const description = response.data;

      await message.reply(description);
    } else if (error) {
      const response = await axios.get(`https://www.api.vyturex.com/promptgen?content=${encodeURIComponent(error)}`);
      const prompt = response.data;

      await message.reply(prompt);
    }
  } catch (error) {
   message.reply(`${error}`);
  }
}
};
