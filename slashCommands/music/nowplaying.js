const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "nowplaying",
    description: "Shows the current song that is playing",
    category: "music",
    ownerOnly: false,
    nsfwOnly: false,
    options: [],
    run: async(bot, interaction, args) => {
        const { guild} = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id)
        let voiceChannel = member.voice.channel;
        let player = bot.music.players.get(interaction.guild.id);

        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the nowplaying command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }

        if(!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }
         
        if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }


        let current = player.queue.current;
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            return `${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
        }
        embed.setTitle("Current Song Playing")
      embed.setColor("BLUE")
        let array = [
            `**Title**: \`${current.title}\``,
            `**Duration**: \`${duration(current.duration)}\``,
            `**Author**: \`${current.author}\``,
            `**Song requested by**: \`${current.requester.tag}\``,
            `**Playing in**: \`${bot.channels.cache.get(player.voiceChannel).name}\``,
            `**Bound to**: \`${bot.channels.cache.get(player.textChannel).name}\``
        ]
        embed.setDescription(array.join("\n"))
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]})
    }
}