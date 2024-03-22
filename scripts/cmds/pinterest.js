const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: 'Pinterest',
    aliases: ["pin"],
    version: '1.2',
    author: 'SiAM',
    countDown: 50,
    role: 0,
    category: 'Image Search',
    shortDescription: {
      en: "Search for images on Pinterest",
    },
    longDescription: {
      en: "Pinterest image search ",
    },
    guide: {
      en: "{pn} 'keyword' -'number of search results'\nExample: {pn} 'cats' -10\nIf no number is provided, the command will return the first 5 images.",
    },
  },

  onStart: async function ({ api, args, event , message }) {
    const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);




    let keyword = args.join(' ');
    let numberSearch = 2;
    const match = keyword.match(/(.+?)\s*-?(\d+)?$/);
    if (match) {
      keyword = match[1].trim();
      if (match[2]) {
        numberSearch = parseInt(match[2]);
      }
    }

    if (!keyword) {
      api.sendMessage("Please provide a keyword.\nExample: Pinterest 'naruto' -6", event.threadID, event.messageID);
      return;
    }

    if (numberSearch > 4) {
      api.sendMessage("Maximum number of search results is 4.", event.threadID, event.messageID);
      return;
    }

    try {
      const res = await axios.get(`https://api-dien.kira1011.repl.co/pinterest?search=${encodeURIComponent(keyword)}`);
      const data = res.data.data;
      let num = 0;
      const img = [];

      for (let i = 0; i < numberSearch; i++) {
        const path = __dirname + `/tmp/${num += 1}.jpg`;
        const getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
        img.push(fs.createReadStream(path));
      }

      api.sendMessage({
        body: ` Total IMG:${numberSearch}\nSearch Input: ${keyword}`,
        attachment: img
      }, event.threadID, event.messageID);

      for (let ii = 1; ii < numberSearch; ii++) {
        fs.unlinkSync(__dirname + `/tmp/${ii}.jpg`);
      }
    } catch (err) {
      console.error(err);
      api.sendMessage("There is problem when scrape image from Pinterest.\n\nPlease try with different search input or change the spelling...!", event.threadID, event.messageID);
      return;
    }
  }
};
