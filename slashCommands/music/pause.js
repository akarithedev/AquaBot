const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "pause",
    category: "music",
    description: "Puts the song on pause and take a break.",
    ownerOnly: false,
    nsfwOnly: false,
    options: [],
    run: async (bot, interaction, args) => {
        const { guild } = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
        let voiceChannel = member.voice.channel;
        let player = bot.music.get(interaction.guild.id);

        if (!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the pause command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [embed] })
        }

        if (!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [embed] })
        }

        if (player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [embed] })
        }

        if (!player.paused) {
            player.pause(true);
            embed.setDescription(`${bot.emoji.success} Paused the song`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [embed] })
        } else {
            embed.setDescription(`${bot.emoji.error} the song is already paused`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [embed] })
        }

    }
}