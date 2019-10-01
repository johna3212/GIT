const { prefix } = require("../../botconfig.json");
const { RichEmbed } = require("discord.js")
const fs = require("fs")
const talkedRecently = new Set();


module.exports = async (bot, message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    if (message.channel.id === "626396108394070016") {
        message.react('👍')
            .then(() => {
                message.react('👎')
                message.react('🤷')
            });
    }

    let args = message.content.slice(prefix.length).split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (message.content.startsWith(prefix)) {
        let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if (commandfile) commandfile.run(bot, message, args);
    }
     if (talkedRecently.has(message.author.id)) {
            return
    } else {

           // the user can type the command ... your command code goes here :)
        if (!message.content.startsWith(prefix)) { 
        let xp = require("../../xp.json");
        let xpAdd = Math.floor(Math.random() * 7) + 8;
        console.log(xpAdd);

        
        if(!xp[message.author.id]){
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }


        
        let nxtLvl = xp[message.author.id].level * 300;
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        xp[message.author.id].xp = curxp + xpAdd;
        if(nxtLvl <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;
        let lvlup = new RichEmbed()
            .setTitle("Level Up!")
            .setColor("#d604cf")
            .addField("New Level", curlvl + 1);

        message.channel.send(lvlup).then(msg => {msg.delete(10000)});

        }
        
        fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            if(err) console.log(err)
        });
        }
        // Adds the user to the set so that they can't talk for a minute

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 5000);
    }

}