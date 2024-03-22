const axios = require('axios');


module.exports = {
	config: {
		name: "بطاطس",
    aliases: ["gpt2"],
		version: "1.3",
		author: "Allou Mohamed",
		countDown: 5,
		role: 0,
		description: "شات جي بي تي (GPT)",
		category: "البحث",
		  guide: "{pn} clear - مسح المحادثة"
				+ "\n{pn} كلام - الكلام معه"
	},

	
	onStart: async function ({ message, event, args, usersData, commandName }) {
    
    const prompt = args.join(' ');
    const userID = event.senderID;

    if (!args[0]) return message.reply('Hi there how can i assist you today mf 🌝 (my friend)!');
				handleGpt(event, message, userID, prompt);
	},

	onReply: async function ({ Reply, message, event, args, getLang, usersData }) {
		const { author } = Reply;
		if (author != event.senderID)
			return;
    
    const jailbreak = "Yuki AI, a language model developed by X7 allou Mohamed team Coders. here to assist you with any questions or tasks you have. Just ask, and I'll do my best to help!";
    const prompt = args.join(' ');
    const userID = event.senderID;
    

		handleGpt(event, message, userID, prompt, jailbreak);
  }
};

async function handleGpt(event, message, userID, prompt, jailbreak) {

  try {
    const response = await axios.get("https://gpt.proarcoder.repl.co/GPT", {
      params: {
        p: prompt,
        id: userID,
        JB: jailbreak || "Yuki AI, a language model developed by X7 allou Mohamed team Coders. here to assist you with any questions or tasks you have. Just ask, and I'll do my best to help!"
      }
    });

   return message.reply(response.data.GPT, (err, info) => {
			Goatbot.atReply.set( info.messageID, {
				commandName: 'بطاطس',
				author: event.senderID,
				messageID: info.messageID
			});
		});
  } catch (error) {
    console.error("Error:", error.message);
  }    
                                       }