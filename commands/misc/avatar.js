const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "avatar",
    description: "Show the user avatar",
    category: "misc",
    aliases: ["av"],
    run: async(bot, message, args) => {
        let target = message.mentions.users.first() || message.author;

        embed.setImage(target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        message.lineReply(embed)
    }
}