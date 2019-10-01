const { Canvas } = require('canvas-constructor');
const { Attachment } = require('discord.js');
const { resolve, join } = require('path');
const fetch = require('node-fetch'); 
const fs = require("fs")
 
module.exports = {
    config: {
        name: "level",
        description: "Check your level",
        usage: ".",
        category: "miscellaneous",                            
        accessableby: "Everyone",
        aliases: []
    },
    run: async (bot, message, args) => {
        var xp  = JSON.parse(fs.readFileSync("./xp.json"));
        let User = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author

        let curxp
                let curlvl
                if (!xp[User.id]) {
                   curxp  =  0;
                   curlvl = 1;
                }
                else {
                  curxp =  xp[User.id].xp;
                  curlvl = xp[User.id].level;
                }
        let nxtLvlXp   = curlvl * 300;
        let difference = nxtLvlXp - curxp;
        try {
          const buffer = await profile(message,User,curlvl,curxp);
          const filename = `profile-${User.id}.jpg`;
          const attachment = new Attachment(buffer, filename);
          await message.channel.send(attachment);
         
        } catch (error) {
          return message.channel.send(`An error ocurred: **${error.message}**`);
        }
    }
}

          
  async function profile(message,Member,curlvl,curxp) {
        const imageUrlRegex = /\?size=2048$/g;
        try {
          const result = await fetch(Member.displayAvatarURL.replace(imageUrlRegex, '?size=128'));
          if (!result.ok) throw new Error('Failed to get the avatar!');
          const avatar = await result.buffer();
     
          const name = Member.username.length > 30 ? Member.username.substring(0, 17) + '...'
            : Member.username;
           console.log(name);
          return new Canvas(400, 180)
            .setColor('#7289DA')
            .addRect(84, 0, 316, 180)
            .setColor("#2C2F33")
            .addRect(0, 0, 84, 180)
            .addRect(169, 26, 231, 46)
            .addRect(224, 108, 176, 46)
            .setShadowColor('rgba(22, 22, 22, 1)')
            .setShadowOffsetY(5)
            .setShadowBlur(10)
            .addCircle(84, 90, 62)
            .addCircularImage(avatar, 85, 90, 64)
            .save()
            .createBeveledClip(20, 138, 128, 32, 5)
            .setColor('#23272A')
            .fill()
            .restore()
            .setTextAlign('center')
            .setTextFont('18pt Klavika Regular')
            .setColor('#FFFFFF')
            .addText(name, 285, 57)
            .addText(`Level: ${curlvl}`, 80, 161)
            .setTextAlign('left')
            .addText(`XP: ${curxp}`, 235, 140)
            .toBuffer();
        } catch (error) {
          await message.channel.send(`An error occurred: **${error.message}**`);
        }
}
    
