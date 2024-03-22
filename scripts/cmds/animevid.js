const axios = require('axios');

module.exports = {
	config: {
		name: "anivideo",
		aliases: ["animevid","animvid","animevideo","amv"],
		version: "1.0",
		author: "Rishad",
		countDown: 60,
		role: 0,
		shortDescription: "",
		longDescription: "",
		category: "anime",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
		
    
    
			const BASE_URL = `https://rishadapi.rishad100.repl.co/anime/animevid?apikey=8689jz719678928`;

       await message.reply('processing your video senpai....\nIt can take upto 15s to 1min');

      
			try {
				let res = await axios.get(BASE_URL)

      
        
			
				let img =  res.data.url;

				const form = {
					body: `Anime video ❤️`
				};
		  if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);  
			} catch (e) { message.reply(`🥺 Not Found`)
                  console.log(e);
                  }

		}
	};