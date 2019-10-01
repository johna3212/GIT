const { RichEmbed } = require('discord.js');
const { readFileSync, writeFile } = require('fs');

module.exports = {
    config: {
        name: "warnings",
        description: "Check the warns of the pinged user.",
        usage: "<user>",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["warns"]
    },

	run: async (bot, message, args) => {
		if(!["605037817676038150", "619984395020795905", "596243475066912778", "595568142542045184", "626490595904323595"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000))

		const member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if (!member) return message.channel.send(':x: Could not locate a valid member.');

		const warnings = JSON.parse(readFileSync('./warnings.json', 'utf8'));


		const warns = warnings[member.id];
        		if (!warns || !warns.length) return message.channel.send('That user has no warnings.');
		const embed = new RichEmbed()
			.setTimestamp()
			.setColor('ORANGE')
			.setAuthor(`Warning Logs For: ${member.user.username} (${member.id})`, member.user.displayAvatarURL);

		for (warning of warns) {
			embed.addField(`*${warning.staff} | ${warning.date}*`, warning.reason);
		}

		message.channel.send(embed);
	}
};
