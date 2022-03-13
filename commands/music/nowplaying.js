const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "nowplaying",
    category: "music",
    description: "Shows the current song that is playing",
    aliases: ["np", "current"],
    run: async(bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.players.get(message.guild.id);

        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the nowplaying command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
         
        if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        let current = player.queue.current;
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            return `${hrs.padStart(1, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
        }
        embed.setAuthor("Current Song Playing", message.guild.iconURL({format: "png", dynamic: true, size: 2048}))
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
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        message.reply({embeds: [embed]})
    }
}