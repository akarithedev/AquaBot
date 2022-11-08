let discord = require("discord.js")

module.exports = async(bot, player) => {
    player.destroy()
    let filters = bot.database.get(`filters_${player.guild}`);
    if(filters !== null) {
        return;
    }  else {
        bot.database.delete(`filters_${player.guild}`);
    }
    let channel = bot.channels.cache.get(player.textChannel);
    let embed = new discord.MessageEmbed()
    .setTitle("Queue ended")
    .setDescription(`The music queue has ended.`)
    .setColor("BLUE")
    channel.send({ embeds: [embed] })
}