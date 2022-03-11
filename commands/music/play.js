const ms = require("parse-ms")
const discord = require("discord.js");
const embed = new discord.MessageEmbed()

module.exports = {
    name: "play",
    description: "Play a song or a playlist from youtube",
    category: "music",
    aliases: ["p", "psong", "search"],
    run: async (bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            embed.setColor("BLUE")
            embed.setDescription("You need to be in a voice channel in order to play music.")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        let songs;
        try {
            songs = args.join(" ")
            let res = await bot.music.search(songs, message.author)

            let player = bot.music.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channelId,
                textChannel: message.channel.id,
                volume: 50,
                autoplay: null
            });

            if (player.voiceChannel !== voiceChannel.id) {
                embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }

            if (!songs) {
                embed.setDescription(`${bot.emoji.error} You need to provide a song name or a song url`)
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
            if (player.state !== "CONNECTED") player.connect()

            if (res.loadType === "NO_MATCHES") {
                if (!player.queue.current) player.destroy();
                embed.setDescription(`${bot.emoji.error} I couldn't found any song called: \`${songs}\``)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })

            }

            if (res.loadType === "PLAYLIST_LOADED") {
                player.queue.add(res.tracks);

                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                embed.setDescription(`${bot.emoji.success} Added playlist \`${res.playlist.name}\` to queue.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
            if(songs.includes("youtube.com") || songs.includes("youtu.be")) {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("YouTube Search", "https://imgs.search.brave.com/maby19lrbcjubbSRuIMSiIuW3o5r8npdyHACTQaXSAk/rs:fit:676:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/Qnl2QWw0Rmw0RGsz/TjlmQTNJdWR3SGFG/TSZwaWQ9QXBp")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            } else if(songs.includes("spotify.com")) {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("Spotify Search", "https://imgs.search.brave.com/M4iQIxvLmqJCjXVXNmUc-MzzDICuHMwykoI7W6MH8rE/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5S/M0FyelJmUGZoR3hR/d1c3MEQ0SG9nSGFF/OCZwaWQ9QXBp")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            } else if(songs.includes("soundcloud.com")) {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("SoundCloud Search", "https://imgs.search.brave.com/DEFT6ouHBuUKOxdfGz9j_5-3Jjc3n18ulLOI3vdKOoI/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4z/SlA2Skwtc2dmRUtN/OGktYVhzV2VnSGFI/YSZwaWQ9QXBp")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            } else {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("Query Search")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            }
            if (!player.playing && !player.paused && !player.queue.size) player.play();
        } catch (e) {
            embed.setDescription(`${bot.emoji.error} ERROR: \`${e.message}\``)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
    }
}