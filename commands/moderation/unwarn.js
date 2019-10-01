const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { readFileSync, writeFile } = require('fs');
const warnings = JSON.parse(readFileSync('./warnings.json', 'utf8'));

const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: "unwarn",
        description: "unwarn the member that you pinged",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Staff",
        aliases: []
    },
run: async (bot, message, args) => {
    if(!["605037817676038150", "619984395020795905", "596243475066912778", "595568142542045184", "626490595904323595"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000))
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(':x: Could not locate a valid member.');


        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No reason provided';


        warnings[member.id] = warnings[member.id].splice(1)
    
        writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
            if (err) console.log(err);
        });

    const embed = new RichEmbed()
        .setColor('ORANGE')
        .setTimestamp()
        .setAuthor('Moderation: UnWarn', bot.user.displayAvatarURL)
        .setDescription(stripIndents`
			**> Moderator:** ${message.author.tag} (${message.author.id})
			**> Member:** ${member.user.tag} (${member.id})
			**> Warnings:** ${warnings[member.id].length}
			**> Reason:** ${reason}
			`);
    
        let warnchannel = message.guild.channels.find(`name`, "incidents");
        if(!warnchannel) return message.reply("Make a channel named incidents!");
    
        message.delete().catch(O_o=>{});
        message.channel.send(`unWarned ${member}`);
        warnchannel.send(embed);
        return;

        }
}   