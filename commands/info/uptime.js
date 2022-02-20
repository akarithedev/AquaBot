const discord = require("discord.js")
const ms = require("parse-ms")
let embed = new discord.MessageEmbed()

module.exports = {
    name: "uptime",
    description: "Shows the bot's uptime",
    aliases: ["botup"],
    category: "info",
    run: async(bot, message, args) => {
        let days = ms(bot.uptime).days
        let hours = ms(bot.uptime).hours
        let minutes = ms(bot.uptime).minutes
        let seconds = ms(bot.uptime).seconds

        embed.setTitle("My uptime")
        embed.addField("Days(s)", `\`\`\`${days}\`\`\``)
        embed.addField("Hour(s)", `\`\`\`${hours}\`\`\``)
        embed.addField("Minute(s)", `\`\`\`${minutes}\`\`\``)
        embed.addField("Second(s)", `\`\`\`${seconds}\`\`\``)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.lineReply(embed)
    }
}