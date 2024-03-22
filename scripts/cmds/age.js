const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "age",
    aliases: ["calculatage","birthday"],
    version: "1.0",
    author: "SiAM",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Calculate Your age ✨",
    category: "s",
    guide: {
      en: "{pn} DD/MM/YYYY",
    },
  },

  onStart: async function ({ api, args, message }) {
    const x = args[0];

    if (!x) {
      message.reply("Please provide a birthdate in the format dd/mm/yyyy. 🗿");
      return;
    }

    const [day, month, year] = x.split("/");
    const currentDate = new Date();

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      message.reply("Invalid date format. Please use dd/mm/yyyy.");
      return;
    }

    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month) - 1;
    const parsedYear = parseInt(year);

    if (parsedDay <= 0 || parsedDay > 31 || parsedMonth < 0 || parsedMonth > 11) {
      message.reply("Invalid date. Please provide a valid day and month.");
      return;
    }

    if (parsedYear >= currentDate.getFullYear()) {
      message.reply("Invalid year. Please provide a year before the current year.");
      return;
    }

    const siam = {
      host: "2.56.119.93",
      port: 5074,
      auth: {
        username: "rkddywvt",
        password: "adougi3io8vn",
      },
      protocol: "http",
    };

    try {
      const res = await axios({
        url: "http://goatbot.tk/api/image/age",
        method: "GET",
        headers: {
          "x-api-key": "HeDOCgPYzU6JYtVYk7nxBpjMVA5448mH",
        },
        params: {
          day: parsedDay.toString().padStart(2, "0"),
          month: (parsedMonth + 1).toString().padStart(2, "0"),
          year: parsedYear.toString(),
        },
        responseType: "arraybuffer",
      });


      const y = "age.jpg";
      const file = path.join(__dirname, y);
      fs.writeFileSync(file, res.data, "binary");


      message.reply(
        {
          body: "Here's the result:",
          attachment: fs.createReadStream(file),
        },
        () => fs.unlinkSync(file) 
      );
    } catch (error) {
      console.error("Error:", error);
      message.reply("error ❌");
    }
  },
};
