const discord = require("discord.js")

module.exports = {
    name: "howhomophobe",
    category: "fun",
    description: "Shows you how anti-gay you are",
    aliases: ["homophobe"],
    ownerOnly: false,
    run: async(bot, message, args) => {
        const target = message.mentions.users.first();
        let gay = Math.floor(Math.random() * 100);

        if(!target) {
            const embed = new discord.MessageEmbed()
            .setTitle("AntiGay Machine")
            .setColor("BLUE")
            .setDescription(`Congrats, you are ${gay}% anti-gay`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({embeds: [embed]})

        } else {
            const embed = new discord.MessageEmbed()
            .setTitle("AntiGay Machine")
            .setColor("BLUE")
            .setDescription(`${target.tag} is ${gay}% anti-gay`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
           return message.reply({embeds: [embed]})

        }
}
}