const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "loop",
    description: "Turns on or off the repeat mode",
    category: "music",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "mode",
        description: "track or queue",
        type: "STRING",
        required: true,
    },
    {
        name: "option",
        description: "enable or disable",
        type: "STRING",
        required: true,
    }],
    run: async (bot, interaction, args) => {
        const { guild} = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id)
        let voiceChannel = member.voice.channel;
        let player = bot.music.players.get(interaction.guild.id);
        let mode = args.getString("mode")
        let option = args.getString("option")

        if (!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the loop command.`)
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


        if (mode === "queue") {
            if(option === "enable") {
                if (player.queueRepeat === false) {
                    player.setQueueRepeat(true);
                    embed.setDescription(`${bot.emoji.success} queue loop is now turned **on**`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return interaction.reply({ embeds: [embed] })
                } else {
                    embed.setDescription(`${bot.emoji.error} queue loop is already turned on`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return interaction.reply({ embeds: [embed] })
                }
            } else if (option === "disable") {
                if (player.queueRepeat === true) {
                    player.setQueueRepeat(false);
                    embed.setDescription(`${bot.emoji.success} queue loop is now disabled`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return interaction.reply({ embeds: [embed] })
                } else {
                    if (player.queueRepeat === false) {
                        embed.setDescription(`${bot.emoji.error} queue loop is already disabled`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return interaction.reply({ embeds: [embed] })
                    }
                }
            }
        } else if (mode === "track") {
            if(option === "enable") {
            if (player.trackRepeat === false) {
                player.setTrackRepeat(true);
                embed.setDescription(`${bot.emoji.success} track loop is now turned **on**`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return interaction.reply({ embeds: [embed] })
            } else {
                embed.setDescription(`${bot.emoji.error} track loop is already turned on`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return interaction.reply({ embeds: [embed] })
            }
        } else if (option === "disable") {
            if (player.trackRepeat === true) {
                player.setTrackRepeat(false);
                embed.setDescription(`${bot.emoji.success} track loop is now disabled`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return interaction.reply({ embeds: [embed] })
            } else {
                if (player.trackRepeat === false) {
                    embed.setDescription(`${bot.emoji.error} track loop is already disabled`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return interaction.reply({ embeds: [embed] })
                }
            }
        }
        } else {
            embed.setDescription(`${bot.emoji.error} Not a valid repeat mode.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [embed] })
        }
    }
}