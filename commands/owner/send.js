const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const fetch = require("node-fetch");


module.exports = {
    config: {
        name: "send",
        description: "",
        usage: "",
        category: "owner",                             
        accessableby: "Owner",
        aliases: []
    },
    run: async (bot, message ,args) => {

    if(!message.member.roles.has("616659346889113637")) return message.reply("You aren't allowed to use this command!").then(d => d.delete(15000))

    const members = message.guild.members;
    const wait = require("util").promisify(setTimeout);
    let msg = args.join(" ")
    let embed = new RichEmbed()
    .setAuthor(`Important announcement!`, message.guild.iconURL)
    .addField(`${msg}`, `Send by: <@${message.author.id}>`)
    members.forEach(async member => {
        await wait(5000)
        member.send(embed)

    });
    }
}