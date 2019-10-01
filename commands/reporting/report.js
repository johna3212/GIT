const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "report",
        description: "You can report someone who broke a rule through this command!",
        usage: "<user> <reason>",
        accessableby: "Everyone",
        category: "reporting",
        aliases: ["rep"]
    },
    run: async (bot, message, args) => {
    // mentioned or grabbed user

    message.delete()
        
    let target = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!target) return message.reply("Please provide a valid user!").then(m => m.delete(15000))
    
    // reason definition

    let reason = args.slice(1).join("")
    if(!reason) return message.reply(`Please provide a reason for reporting ${target.user.username}`).then(m => m.delete(15000))

    // grab reports channel
        let sChannel = message.guild.channels.find(x => x.name === "reports")
        if(!sChannel) return message.reply("I can't find a channel to restore the warns in")

        // send to reports channel with reactions
        let embed = new RichEmbed()
        .setColor("#d90432")
        .setAuthor(`${message.guild.name} reports`, message.guild.iconURL)
        .addField("Reportee:", target, true)
        .addField("Reported By:", `${message.author.username}`, true)
        .addField("Reason", `${reason}`, true)
        
        sChannel.send(embed).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")
        })


        }
    }