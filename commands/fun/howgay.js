const discord = require("discord.js")

module.exports = {
    name: "howgay",
    category: "misc",
    description: "Shows you how gay you are :D",
    aliases: ["gayness", "gaymachine"],
    ownerOnly: false,
    run: async(bot, message, args) => {
        const target = message.mentions.users.first();
        let gay = Math.floor(Math.random() * 100);

        if(!target) {
            const embed = new discord.MessageEmbed()
            .setTitle("Gay Machine")
            .setColor("BLUE")
            .setDescription(`You are ${gay}% gay`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            message.reply({embeds: [embed]})
            return;

        } else {
            const embed = new discord.MessageEmbed()
            .setTitle("Gay Machine")
            .setColor("BLUE")
            .setDescription(`${target.tag} is ${gay}% gay`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            message.reply({embeds: [embed]})
            return;

        }
        if(target.bot) {
            const embed2 = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} This command cannot be used on bots`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            message.reply({embeds: [embed2]})
            return;
    }
}
}