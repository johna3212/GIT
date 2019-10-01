const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "clear",
        description: "Remove a amount of messages thats given",
        usage: "<anount>",
        category: "Moderation",
        accessableby: "Trainee+",
        aliases: ["prune", "purge", "removemessage", "rm"]
    },
    run: async (bot, message, args) => {
        message.delete()
        if(!["620613056820412457", "616917579256037396", "616659346889113637", "624650733513342977", "624650683311718411"].some(x => message.member.roles.has(x))) return message.reply("You are not allowed to perform this command!").then(d => d.delete(5000))

        if (!args[0]) return message.reply('Give me a amount of how much message I need to remove!').then(w => w.delete(15000))

        if (Number.isInteger(parseInt(args[0]))) {
            const amount = parseInt(args[0]) + 1;

            message.channel.bulkDelete(amount).then(() => {
                let embed = new RichEmbed()
                    .setColor("GREEN")
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setDescription(`Removed ${amount} mesages`)


                message.channel.send(embed).then(d => d.delete(15000));
            })
        } else {
            return message.channel.send("Give me a ")
        }
    }
}