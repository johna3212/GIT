const { token, version, prefix } = require("./botconfig.json");
const { Client, Collection, RichEmbed} = require("discord.js");
const bot = new Client();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity(`Ver: ${version} | Prefix: ${prefix}`, {type: "WATCHING"});
});
// Listener Event: Bot Launched: Check if member is added
bot.on('guildMemberAdd', member => {


    const members = member.guild.roles.find(`name`, "M | Member");

    members.addRole(member);
    let Wchannel = message.guild.channels.find(c => c.name === "welcome-goodbye");

    let jembed = new RichEmbed()
        .setColor("GREEN")
        .setDescription(`${member.user.username} just joined the server`);

    Wchannel.send(jembed);

    let pembed = new RichEmbed()
        .setColor("BLUE")
        .setDescription(`Welcome to ${message.guild.name}, hope you enjoy your stay! Please read`)
    member.send(pembed)


    
});

["commands", "aliases"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));



bot.login(token);


