const { RichEmbed } = require('discord.js');
const { readFileSync, writeFile } = require('fs');
const warnings = JSON.parse(readFileSync('./warnings.json', 'utf8'));
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: "warn",
        description: "Warn the pinged user",
        usage: "<user> [<reason>]",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["warn"]
    },

	run: async (bot, message, args) => {
		if(!["605037817676038150", "619984395020795905", "596243475066912778", "595568142542045184", "626490595904323595"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000))

		const member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if (!member) return message.channel.send(':x: Could not locate a valid member.');
		if (member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(':x: That member seems to be staff!');

		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason provided.';

		if (!warnings[member.id]) warnings[member.id] = [];

		warnings[member.id].push({
			date: moment(new Date()).format('HH:mm DD.MM.YY'),
			staff: message.author.username,
			reason: reason
		});

		const embed = new RichEmbed()
			.setColor('ORANGE')
			.setTimestamp()
			.setAuthor('Moderation: Warn', bot.user.displayAvatarURL)
			.setDescription(stripIndents`
			**> Moderator:** ${message.author.tag} (${message.author.id})
			**> Member:** ${member.user.tag} (${member.id})
			**> Warnings:** ${warnings[member.id].length}
			**> Reason:** ${reason}
			`);

		writeFile('./warnings.json', JSON.stringify(warnings), (err) => {
			if (err) return message.channel.send(`Error: ${err.message}`);
		});

		// send direct message

		message.channel.send(`? Successfully warned ${member.user.tag}.`);

		const channel = message.guild.channels.find((c) => c.name === 'incidents');
		if (channel) channel.send(embed);

		if (warnings[member.id].length == 3) {
			member.send(`You've been kicked from ${message.guild.name} because you had 3 warnings. *This is an automated Kick*`);
			message.guild.member(member).kick();
			message.reply(`<@${wUser.id}> has been kicked because of 3 warnings`)

		}
		if (warnings[member.id].length == 4) {
			member.send(`You've been banned! from ${message.guild.name} because you had 3 warnings. Duration: No ending. *This is an automated ban`);
			message.guild.member(member).ban(reason);
			message.reply(`<@${wUser.id}> has been banned because of 4 warnings`)
			return;

		}
	}
};
