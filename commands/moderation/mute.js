const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: "mute",
        description: "Mute the pinged user",
        usage: "<user> <reason>",
        accessableby: "Staff",
        category: "moderation",
        aliases: ["m", "nospeak"]
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission
        if(!["605037817676038150", "619984395020795905", "596243475066912778", "595568142542045184", "626490595904323595"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000))
      
        if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You don't have permissions to mute him").then(d => d.delete(5000))
        // define the reason and mutee

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!mutee) return message.reply("Please ping the user you want to mute!").then(d => d.delete(5000));

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given"
        

        //define mute role and if the mute role doesn't exist then create one
        let muterole = message.guild.roles.find(r => r.name === "Muted")
        if(!muterole) {
            try{
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                })
                message.guild.channels.forEach(async  (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONs: false,
                        SPEAK: false
                    });
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        mutee.addRole(muterole.id).then(() => {
            message.delete()
            mutee.send(`You have been muted in ${message.guild.name} for: ${reason}`)
            message.channel.send(`${mutee.user.username} is muted`)
        })


    let embed = new RichEmbed()
        .setColor('ORANGE')
        .setTimestamp()
        .setAuthor('Moderation: Mute', bot.user.displayAvatarURL)
        .setDescription(stripIndents`
			**> Moderator:** ${message.author.tag} (${message.author.id})
			**> Member:** ${member.user.tag} (${member.id})
			**> Reason:** ${reason}
			`);

    let sChannel = message.guild.channels.find(c => c.name === "incidents")
    sChannel.send(embed);

    }
}