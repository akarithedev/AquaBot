const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "ping",
    description: "Shows the bot latency",
    category: "info",
    aliases: ["pong"],
    run: async(bot, message, args) => {
        let msg = await message.lineReply("Pinging...")
        let ping = message.createdTimestamp - msg.createdTimestamp

        embed.setDescription(`**Message**: \`${ping}\`ms\n**WebSocket**: \`${bot.ws.ping}\`ms`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        msg.edit("", embed)
    }
}