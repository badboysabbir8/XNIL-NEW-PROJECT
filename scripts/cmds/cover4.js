const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
	config: {
		name: "cover4",
		version: "1.0",
		author: "munem.",
		countDown: 30,
		role: 0,
		shortDescription: "Create fb Banner",
		longDescription: "",
		category: "image",
		guide: {
			en: "{p}{n}  Name or code | text | Text",
		}
	},

  

	onStart: async function ({ message, args, event, api }) {
 
    const info = args.join(" ");
		if (!info){
			return message.reply(`Please enter in the format:\/avatar  Name or code | text | Text`);
      
      }else {
      const msg = info.split("|");
      const id = msg[0];
    const name = msg[1];
    const juswa = msg[2];
       const bgtext = msg[3];

        

       if (isNaN(id)) { // If input is not a number
          await message.reply("Processing your cover, sensei...");

         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply("Character not found, please check the name and try again...");
      return;
    }

        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu6?id=${id1}&tenchinh=${name}&tenphu=${juswa}&mxh=${bgtext}&apikey=az4d4hVW`)			
                 const form = {
				body: `「 Here's your cover sensei 🗿 」`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
         
      

       }else  { 
       await message.reply("Processing your cover, sensei...");
         
         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu6?id=${id}&tenchinh=${name}&tenphu=${juswa}&mxh=${bgtext}&apikey=az4d4hVW`)			
                 const form = {
				body: `「 Here's your cover sensei 🗿 」`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
        }
      }
    }
   };