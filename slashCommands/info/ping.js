const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "ping",
    description: "Shows the bot latency",
    category: "info",
    ownerOnly: false,
    nsfwOnly: false,
    options: [],
    run: async(bot, interaction, args) => {
       
        embed.setDescription(`My current ping is **${bot.ws.ping}**ms`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]})
    }
}