const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "loop",
    description: "Turns on the repeat mode",
    category: "music",
    aliases: ["repeat"],
    run: async (bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.players.get(message.guild.id);
        let option = args.join(" ")

        if (!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the loop command.`)
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

        if (!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
        if (!option) {
            embed.setDescription(`${bot.emoji.error} You must provide a repeat mode.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (option === "queue") {
            if (player.queueRepeat === false) {
                player.setQueueRepeat(true);
                embed.setDescription(`${bot.emoji.success} queue loop is now turned **on**`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            } else {
                embed.setDescription(`${bot.emoji.error} queue loop is already turned on`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
        } else if (option === "track") {
            if (player.trackRepeat === false) {
                player.setTrackRepeat(true);
                embed.setDescription(`${bot.emoji.success} track loop is now turned **on**`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            } else {
                embed.setDescription(`${bot.emoji.error} track loop is already turned on`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
        } else if (option === "disable queue") {
            if (player.queueRepeat === true) {
                player.setQueueRepeat(false);
                embed.setDescription(`${bot.emoji.success} queue loop is now disabled`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            } else {
                if (player.queueRepeat === false) {
                    embed.setDescription(`${bot.emoji.error} queue loop is already disabled`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({ embeds: [embed] })
                }
            }
        } else if (option === "disable track") {
            if (player.trackRepeat === true) {
                player.setTrackRepeat(false);
                embed.setDescription(`${bot.emoji.success} track loop is now disabled`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            } else {
                if (player.trackRepeat === false) {
                    embed.setDescription(`${bot.emoji.error} track loop is already disabled`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({ embeds: [embed] })
                }
            }
        } else {
            embed.setDescription(`${bot.emoji.error} Not a valid repeat mode.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
    }
}