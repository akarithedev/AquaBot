const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "ping",
    description: "Shows the bot latency",
    category: "info",
    aliases: ["pong"],
    run: async(bot, message, args) => {

        embed.setDescription(`My current ping is **${bot.ws.ping}**ms`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        message.reply({embeds: [embed]})
    }
}