const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: "unmute",
        description: "unmute the pinged user",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["um", "speak"]
    },
    run: async (bot, message, args) => {
        //check if the command caller has permission to use the command
        if(!["605037817676038150", "619984395020795905", "596243475066912778", "595568142542045184", "626490595904323595"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000))
      
        if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission").then(d => d.delete(15000))


        //define the reason and unmutee
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!mutee) return message.reply("Please ping the user you want to mute!").then(d => d.delete(5000));

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given"
        
        //define mute role and if it doesn't exist then send a message
        let muterole = message.guild.roles.find(r => r.name === "Muted")
        if(!muterole) return message.reply("This person isn't muted.").then(d => d.delete(5000))

        //remove role of the mentioned mutee
        mutee.removeRole(muterole.id).then(() => {
            message.delete()
            mutee.send(`Good news! You have been unmuted in ${message.guild.name} for: ${reason}`)
            message.channel.send(`${mutee.user.username} is unmuted!`).then(d => d.delete(5000))
        })

        let embed = new RichEmbed()
            .setColor('ORANGE')
            .setTimestamp()
            .setAuthor('Moderation: UnMute', bot.user.displayAvatarURL)
            .setDescription(stripIndents`
			**> Moderator:** ${message.author.tag} (${message.author.id})
			**> Member:** ${member.user.tag} (${member.id})
			**> Reason:** ${reason}
			`);

        
    let sChannel = message.guild.channels.find(c => c.name === "incidents")
    sChannel.send(embed);
    }   
}