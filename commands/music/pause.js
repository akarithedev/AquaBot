const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "pause",
    category: "music",
    description: "Puts the song on pause and take a break.",
    aliases: ["pausesong", "break"],
    ownerOnly: false,
    run: async (bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.get(message.guild.id);
        let option = args[0]

        if (!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the pause command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (!player.paused) {
            player.pause(true);
            embed.setDescription(`${bot.emoji.success} Paused the song`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        } else {
            embed.setDescription(`${bot.emoji.error} the song is already paused`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

    }
}