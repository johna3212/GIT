const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const fetch = require("node-fetch");


module.exports = {
    config: {
        name: "help",
        description: "shows this message",
        usage: ";help",
        category: "miscellaneous",                             
        accessableby: "Everyone",
        aliases: []
    },
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
        .setColor("#00fff2")
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)

        if(!args[0]) {
            const categories = readdirSync("./commands")

            embed.setDescription(`These are the available commands for ${message.guild.me.displayname}\nThe bot prefix is **${prefix}**`)
            embed.setFooter(`CX | Community!  | Total Commands: ${bot.commands.size} `, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitallise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try{
                    embed.addField(`> ${capitallise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
            
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase())  || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Invalid Comand").setDescription(`Do \`${prefix}help\` for the list of commands.`))
            command = command.config

            embed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description Provided"}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Acccesible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(" ") : "None."}`)

            return message.channel.send(embed)
        }
    }
}