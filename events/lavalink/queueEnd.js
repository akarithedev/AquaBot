module.exports = async(bot, player) => {
    player.destroy()
    let channel = bot.channels.cache.get(player.textChannel);
   
    bot.embed.setTitle("Queue ended")
    .setDescription(`The music queue has ended.`)
    .setColor("BLUE")
    channel.send({ embeds: [bot.embed] })
}