const fetch = require('node-fetch');
const fs = require('fs');

const protectedIds = global.GoatBot.config.adminBot;

module.exports = {
  config: {
    name: "fakechat",
    aliases: ["q"],
    version: "1.0",
    author: "teamvortex",
    countDown: 10,
    role: 0,
    shortDescription: "Make Fake chat",
    longDescription: "Make Fake Chat(for fun only)",
    category: "q",
    guide: {
      en: "{pn} (message) | uid or mention or fblink or me\n\nExample:\n{pn} text | me\n{pn} text | 12282928288\n{pn} text | @mention\n{pn} text | https://www.facebook.com/zuck\n{pn} text (reply to someone).\n\n!Note:\nyou can reply to any image to add that in the fakechat."
    }
  },

  onStart: async function ({ api, args, message, event }) {
    try {
      const { findUid, getPrefix } = global.utils;

      const p = getPrefix(event.threadID);

      let uid = null;
      let Message = null;
      let imageUrl = null;

      const input = args.join(' ');

      if (!input) {
        message.reply(`learn to eat then type ${p}help Fakechat\nto learn how to use this command.`);
        return;
      }

      let replySenderId = null;
      if (event.messageReply) {
        if (["photo", "sticker"].includes(event.messageReply.attachments[0]?.type)) {
          imageUrl = event.messageReply.attachments[0].url;
        }
        replySenderId = event.messageReply.senderID;
      }

      if (input.includes('|')) {
        const inputPart = input.split('|');

        if (inputPart.length === 2) {
          Message = inputPart[0].trim();
          uid = inputPart[1].trim();
        } else {
          message.reply(`learn to eat then type ${p}help Fakechat\nto learn how to use this command.`);
          return;
        }

        if (uid.toLowerCase() === "me") {
          uid = event.senderID;
        } else if (event.mentions && Object.keys(event.mentions).length > 0) {
          uid = Object.keys(event.mentions)[0];
        } else if (/^\d+$/.test(uid)) {
        } else if (uid.includes('facebook.com')) {
          let linkUid;
          try {
            linkUid = await findUid(uid);
          } catch (error) {
            console.log(error);
            return api.sendMessage("couldn't find any ID from the Facebook Url you provided.", event.threadID);
          }
          if (linkUid) {
            uid = linkUid;
          }
        } else {
          message.reply("it only works with @mention, uid, fblink, or me");
          return;
        }
      } else if (replySenderId) {
        Message = input.trim();
        uid = replySenderId;
      } else {
        message.reply(`Learn to use, you bakaa!!\n\nusage:\n${p}Fakechat (text) | [ @mention or uid or fblink or me ]`);
        return;
      }

      if (!Message) {
        message.reply(`learn to eat\nThen learn to use.\n\nUsage: ${p}Fakechat Hello | @tag or uid or fblink or me`);
        return;
      }

      const sexInfo = await api.getUserInfo([uid]);
      const xuser = sexInfo[uid];
      const sexname = xuser.name;

      if (protectedIds.includes(uid)) {
        if (event.senderID !== uid) {
          message.reply(`${sexname}: 🏳️‍🌈?`);
          uid = event.senderID;
          Message = `Hey! ${sexname}!!!\nI'm Gay:3`;
        }
      }

      const randomWords = ['gay', 'threesome', 'abal', 'nununai', 'bts'];
      function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * randomWords.length);
        return randomWords[randomIndex];
      }

      let profileName;
      let profilePicUrl;

      // Introduce a delay of 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 8000));

      try {
        const profileInfo = await api.getUserInfo([uid]);
        const user = profileInfo[uid];

        profileName = user.name;
        const nameWord = profileName.split(' ');
        if (nameWord.length === 1) {
          profileName += ' ' + getRandomWord();
        }

        profilePicUrl = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
      } catch (error) {
        console.log(error);
        return api.sendMessage("Error occurred while retrieving the profile picture.", event.threadID);
      }

      let apiUrl = ` https://fakechat.tantrik-api.repl.co/generate?message=${encodeURIComponent(Message)}&avatar=${encodeURIComponent(profilePicUrl)}&name=${encodeURIComponent(profileName)}&themeName=Splash&type=light&apikey=munimKey2006`;




      if (imageUrl) {
        apiUrl += `&image=${encodeURIComponent(imageUrl)}`;
      }
       console.log(apiUrl);

      const res = await fetch(apiUrl);
      if (!res.ok) {
        message.reply(`failed to retrieve the image.`);
        return;
      }

      const buffer = await res.buffer();
      const tag = Date.now();
      fs.writeFileSync(`${tag}.jpg`, buffer);

      message.reply(
        {
          body: "",
          attachment: fs.createReadStream(`${tag}.jpg`),
        },
        () => fs.unlinkSync(`${tag}.jpg`)
      );
    } catch (err) {
      console.log(err);const fetch = require('node-fetch');
const fs = require('fs');

const protectedIds = global.GoatBot.config.adminBot;

module.exports = {
  config: {
    name: "fakechat",
    aliases: ["q"],
    version: "1.0",
    author: "teamvortex",
    countDown: 10,
    role: 0,
    shortDescription: "Make Fake chat",
    longDescription: "Make Fake Chat(for fun only)",
    category: "q",
    guide: {
      en: "{pn} (message) | uid or mention or fblink or me\n\nExample:\n{pn} text | me\n{pn} text | 12282928288\n{pn} text | @mention\n{pn} text | https://www.facebook.com/zuck\n{pn} text (reply to someone).\n\n!Note:\nyou can reply to any image to add that in the fakechat."
    }
  },

  onStart: async function ({ api, args, message, event }) {
    try {
      const { findUid, getPrefix } = global.utils;

      const p = getPrefix(event.threadID);

      let uid = null;
      let Message = null;
      let imageUrl = null;

      const input = args.join(' ');

      if (!input) {
        message.reply(`learn to eat then type ${p}help Fakechat\nto learn how to use this command.`);
        return;
      }

      let replySenderId = null;
      if (event.messageReply) {
        if (["photo", "sticker"].includes(event.messageReply.attachments[0]?.type)) {
          imageUrl = event.messageReply.attachments[0].url;
        }
        replySenderId = event.messageReply.senderID;
      }

      if (input.includes('|')) {
        const inputPart = input.split('|');

        if (inputPart.length === 2) {
          Message = inputPart[0].trim();
          uid = inputPart[1].trim();
        } else {
          message.reply(`learn to eat then type ${p}help Fakechat\nto learn how to use this command.`);
          return;
        }

        if (uid.toLowerCase() === "me") {
          uid = event.senderID;
        } else if (event.mentions && Object.keys(event.mentions).length > 0) {
          uid = Object.keys(event.mentions)[0];
        } else if (/^\d+$/.test(uid)) {
        } else if (uid.includes('facebook.com')) {
          let linkUid;
          try {
            linkUid = await findUid(uid);
          } catch (error) {
            console.log(error);
            return api.sendMessage("couldn't find any ID from the Facebook Url you provided.", event.threadID);
          }
          if (linkUid) {
            uid = linkUid;
          }
        } else {
          message.reply("it only works with @mention, uid, fblink, or me");
          return;
        }
      } else if (replySenderId) {
        Message = input.trim();
        uid = replySenderId;
      } else {
        message.reply(`Learn to use, you bakaa!!\n\nusage:\n${p}Fakechat (text) | [ @mention or uid or fblink or me ]`);
        return;
      }

      if (!Message) {
        message.reply(`learn to eat\nThen learn to use.\n\nUsage: ${p}Fakechat Hello | @tag or uid or fblink or me`);
        return;
      }

      const sexInfo = await api.getUserInfo([uid]);
      const xuser = sexInfo[uid];
      const sexname = xuser.name;

      if (protectedIds.includes(uid)) {
        if (event.senderID !== uid) {
          message.reply(`${sexname}: 🏳️‍🌈?`);
          uid = event.senderID;
          Message = `Hey! ${sexname}!!!\nI'm Gay:3`;
        }
      }

      const randomWords = ['gay', 'threesome', 'abal', 'nununai', 'bts'];
      function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * randomWords.length);
        return randomWords[randomIndex];
      }

      let profileName;
      let profilePicUrl;

      // Introduce a delay of 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 8000));

      try {
        const profileInfo = await api.getUserInfo([uid]);
        const user = profileInfo[uid];

        profileName = user.name;
        const nameWord = profileName.split(' ');
        if (nameWord.length === 1) {
          profileName += ' ' + getRandomWord();
        }

        profilePicUrl = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
      } catch (error) {
        console.log(error);
        return api.sendMessage("Error occurred while retrieving the profile picture.", event.threadID);
      }

      let apiUrl = ` https://fakechat.tantrik-api.repl.co/generate?message=${encodeURIComponent(Message)}&avatar=${encodeURIComponent(profilePicUrl)}&name=${encodeURIComponent(profileName)}&themeName=Splash&apikey=munimKey2006`;




      if (imageUrl) {
        apiUrl += `&image=${encodeURIComponent(imageUrl)}`;
      }
       console.log(apiUrl);

      const res = await fetch(apiUrl);
      if (!res.ok) {
        message.reply(`failed to retrieve the image.`);
        return;
      }

      const buffer = await res.buffer();
      const tag = Date.now();
      fs.writeFileSync(`${tag}.jpg`, buffer);

      message.reply(
        {
          body: "",
          attachment: fs.createReadStream(`${tag}.jpg`),
        },
        () => fs.unlinkSync(`${tag}.jpg`)
      );
    } catch (err) {
      console.log(err);
      message.reply("Error");
    }
  },
};
      message.reply("Error");
    }
  },
};