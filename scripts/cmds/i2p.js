const axios = require("axios");

module.exports = {
  config: {
    name: "i2p",
    aliases: ["imgtoprompt"],
    version: "1.0",
    author: "ArchitectDevs",
    category: "Prompt",
    guide: "Converts an image to a prompt.",
  },

  onStart: async function ({ event, message, args }) {
    try {
      const imageUrl = event.messageReply?.attachments[0]?.url;

      if (!imageUrl) {
        return message.reply(`Please reply to an image.`);
      } else {
        await message.reply("Please wait...⏳");

        try {
          const response = await axios.get(`https://api.tantrik-apis.repl.co/imagetoprompt?imageUrl=${encodeURIComponent(imageUrl)}&apikey=munimKey2006`);

          const description = response.data.description;
          if (description) {
            message.reply(`${description}`);
          } else {
            message.reply("Failed to get a prompt from the image.");
          }
        } catch (error) {
          console.error(error);
          message.reply("An error occurred while processing the image.");
        }
      }
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
    }
  },
};