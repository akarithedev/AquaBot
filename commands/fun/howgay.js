const discord = require("discord.js")

module.exports = {
    name: "howgay",
    category: "fun",
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
            return message.reply({embeds: [embed]})

        } else {
            const embed = new discord.MessageEmbed()
            .setTitle("Gay Machine")
            .setColor("BLUE")
            .setDescription(`${target.tag} is ${gay}% gay`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
           return message.reply({embeds: [embed]})

        }
}
}