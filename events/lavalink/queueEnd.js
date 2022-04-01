let discord = require("discord.js")

module.exports = async(bot, player) => {
    player.destroy()
    let channel = bot.channels.cache.get(player.textChannel);
    let embed = new discord.MessageEmbed()
    .setTitle("Queue ended")
    .setDescription(`The music queue has ended.`)
    .setColor("BLUE")
    channel.send({ embeds: [embed] })
}