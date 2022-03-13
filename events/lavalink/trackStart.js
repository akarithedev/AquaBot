let discord = require("discord.js");

module.exports = async(bot, player, track) => {
    let channel = bot.channels.cache.get(player.textChannel);
    let filters = await bot.database.get(`filters_${player.guild}`);
    let embed = new discord.MessageEmbed()
    .setAuthor("Started Playing", "https://imgs.search.brave.com/oyv9NvW9g1RvUWiERhs3gpdQ4vo-tiqoXppHuAkDBIU/rs:fit:700:700:1/g:ce/aHR0cHM6Ly9tZWRp/YTAuZ2lwaHkuY29t/L21lZGlhL1NTOHph/TkZJYnd5amNQZGg4/VS9zb3VyY2UuZ2lm.gif")
    .setThumbnail(track.thumbnail)
    .setDescription(`**[${track.title}](${track.uri})**\n**Volume**: \`${player.volume}%\`\n**Filter(s)**: \`${filters.length !== 0 ? filters.join(', ') : 'None'}\``)
    .setFooter(`Requester: ${track.requester.tag}`, track.requester.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))
    .setColor("BLUE")
    let msg = await channel.send({ embeds: [embed] })
    if(track.isStream) return;
    setTimeout(() => {
        if(track.isSeekable) {
        return msg.delete()
        }
        }, track.duration)
}