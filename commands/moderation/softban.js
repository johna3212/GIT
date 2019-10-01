const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: "softban",
        description: "softban the pinged user and clear all his messages",
        usage: ";<user> <reason>",
        accessableby: "Staff",
        category: "moderation",
        aliases: ["sb", "sremove"]
    },
    run: async (bot, message, args) => {

        if(!["605037817676038150", "619984395020795905", "596243475066912778", "595568142542045184", "626490595904323595"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000))
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.repyl("I don't have permission to ban!").then(d => d.delete(5000))

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!banMember) return message.reply("Please provide a user to ban!").then(d => d.delete(5000))

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given!"

        message.delete()

        banMember.send(`You have been banned from ${message.guild.name} for: ${reason}`).then(() => 
        message.guild.ban(banMember, {days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban "}))

        message.channel.send(`**${banMember.user.tag}** has been banend`).then(d => d.delete(5000))

        let embed = new RichEmbed()
            .setColor('RED')
            .setTimestamp()
            .setAuthor('Moderation: Softban', bot.user.displayAvatarURL)
            .setDescription(stripIndents`
			**> Moderator:** ${message.author.tag} (${message.author.id})
			**> Member:** ${member.user.tag} (${member.id})
			**> Reason:** ${reason}
			`);
    
            let sChannel = message.guild.channels.find(c => c.name === "incidents")
            sChannel.send(embed);


        
        
        }   

    }    