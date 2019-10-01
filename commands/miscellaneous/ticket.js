const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "ticket",
        description: "Create a ticket for help!",
        usage: "<ticket reason> (not needed)",
        category: "miscellaneous",
        accessableby: "Everyone",
        aliases: ["support", "requesthelp", "createticket"]
    },
    run: async (bot, message, args) => {
        message.delete()
        // Embeds

        let reason = args.slice(0).join(" ");
        if(!reason) reason = `Didn't provide a reason!`;

        let ERembed = new RichEmbed()
            .setColor("#ff0000")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .addField('**An error occured**', `\n
            
            Something went wrong!
            `)
            .setFooter(bot.user.username, bot.user.displayAvatarURL)

        let MADembed = new RichEmbed()
            .setColor("cf119f")
            .setAuthor(message.author.username.toString(), message.author.displayAvatarURL)
            .addField(`\n
            
            **Reason**:
            
 ${reason}`, `\n
             
             **Time**: ${message.createdAt()}`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL);

        let MAembed = new RichEmbed()
            .setColor("#00ff00")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription("Your channel is getting created")
            .setFooter(bot.user.username, bot.user.displayAvatarURL);

        let ALembed = new RichEmbed()
            .setColor("#ff0700")
            .setAuthor(message.author.username + message.author.displayAvatarURL)
            .addField("**Error**", `\n
            You've made a ticket already!`)
            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);

        // Const list



        const categoryID = "627185414708396035";

        const userName = message.author.username;
        const userDiscriminator = message.author.discriminator;

        let bool = false;

        // Full code


        message.guild.channels.forEach((channel) => {

            if(channel.name == userName.toLowerCase() + "-" +  userDiscriminator) {

                message.channel.send(ALembed).then(d => d.delete(15000));

                bool = true;


            }


        });

        if(bool == true) return;

        message.channel.send(MAembed).then(d => d.delete(15000));



        message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {

            createdChan.setParent(categoryID).then((settedParent) => {

                settedParent.overwritePermissions(message.guild.roles.find(`name`,"@everyone"), { "READ_MESSAGES": false})

                settedParent.overwritePermissions(message.author, {
                    "READ_MESSAGES": true,
                    "CREATE_INSTANT_INVITE": false,
                    "SEND_MESSAGES": true,
                    "ATTACH_FILES": true
                });

                settedParent.send("<@626417283224305665>")
                settedParent.send(MADembed)



            }).catch(err => {
                message.channel.send(ERembed).then(w => w.delete(5000))
            })

        });




    }
}