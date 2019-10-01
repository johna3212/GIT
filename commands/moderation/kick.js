const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: "kick",
        description: "Kick the pinged member from the server",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["k", "kack"]
    },
    run: async (bot, message, args) => {
        if(!["605037817676038150", "619984395020795905", "596243475066912778", "595568142542045184", "626490595904323595"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000));


        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.repyl("I don't have permission to kick!").then(d => d.delete(5000));

        let kMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!kMember) return message.reply("Please provide a user to kick").then(d => d.delete(5000));

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given"

;
        kMember.send(`You have been kicked from: ${message.guild.name} for: ${reason}`);
        kMember.kick();

        message.channel.send(`**${kMember.user.tag}** has been kicked`).then(d => d.delete(5000));

        
        let embed = new RichEmbed()
            .setColor('RED')
            .setTimestamp()
            .setAuthor('Moderation: Kick', bot.user.displayAvatarURL)
            .setDescription(stripIndents`
			**> Moderator:** ${message.author.tag} (${message.author.id})
			**> Member:** ${member.user.tag} (${member.id})
			**> Reason:** ${reason}
			`);
    
            let sChannel = message.guild.channels.find(c => c.name === "incidents");
            sChannel.send(embed);

    }   
}