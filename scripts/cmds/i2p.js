const axios = require("axios");

module.exports = {
  config: {
    name: "describe",
    aliases: ["i2p"],
    version: "1.0",
    author: "Arfan",
    category: "Prompt",
    guide: "Converts an image to a prompt.",
  },

  onStart: async function ({ event, message, args, api }) {
    try {
      const imageUrl = event.messageReply?.attachments[0]?.url;

      if (!imageUrl) {
        return message.reply('Please reply to an image.');
      } else {
        const waitMessage = await message.reply("Please wait...");

        try {
          const response = await axios.get(
            `https://apis-samir.onrender.com/image2prompt?imageUrl=${encodeURIComponent(imageUrl)}`
          );

          const description = response.data;
          if (description) {
            message.reply(`${description}`);
          } else {
            message.reply("Failed to get a prompt from the image.");
          }
        } catch (error) {
          console.error(error);
          message.reply("An error occurred while processing the image.");
        }

        // Unsend the wait message
        api.unsendMessage(waitMessage.messageID);
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
    }
  },
};
