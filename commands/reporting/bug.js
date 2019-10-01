const { RichEmbed } = require("discord.js");


module.exports = {
    config: {
        name: "bug",
        description: "You can report a bug of the game or of the discord",
        usage: "<bug>",
        accessableby: "Everyone",
        category: "reporting",
        aliases: ["reportbug", "rb"]
        
    },
    run: async (bot, message, args) => {
        
        // Define the bug

        let bug = args.slice(0).join(" ")
        if(!bug) return message.reply('Please provide which bug you want to report!').then(d => d.delete(15000))

        // Check for the channel

        let bChannel = message.guild.channels.find(b => b.name === "『📋』bugs")
        if(!bChannel) return message.reply("Can't find a channel to store the bug report in")

        // Make the Embed

        let embed = new RichEmbed()
        .setColor("#a61180")
        .setDescription(`${message.guild.name} Bug report`)
        .addField("Bug reported by:", message.author.username, true)
        .addField(`Bug:`, `${bug}`, true);


        
       bChannel.send(embed).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")
        })
    }
}