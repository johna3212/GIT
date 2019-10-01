const { RichEmbed } = require("discord.js");
const { red } = require("../../botconfig.json");
const { purple } = require("../../botconfig.json")

module.exports = {
    config: {
        name: "close",
        description: "Close the ticket where you are in",
        usage: "<close reason> ",
        category: "miscellaneous",
        accessableby: "Ticket Owner and Trainee+",
        aliases: ["closeticket", "end", "stopsession"]
    },
    run: async (bot, message, args) => {

        const discord = require("discord.js");

        module.exports.run = async (bot, message, args) => {

            // Embeds
            let WWc = new RichEmbed()
                .setColor(purple)
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .addField("**Error**:", `\n
                Please use this command it your ticket!`)

            // ID of category from ticket
            const categoryId = "627185414708396035";

            // If message is in channel
            if (message.channel.parentID == categoryId) {

                message.channel.delete();

            } else {

                message.channel.send(WCc);

            }


            // Vind kanaal voor de logs.
            const logChannel = message.guild.channels.find("name", "log");
            if (!logChannel) return message.channel.send("Kanaal bestaat niet");

            logChannel.send(embedCloseTicket);

        }

    }
}