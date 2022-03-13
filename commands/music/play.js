const ms = require("parse-ms")
const discord = require("discord.js");
const embed = new discord.MessageEmbed()

module.exports = {
    name: "play",
    description: "Play a song or a playlist from youtube/spotify/soundcloud/deezer/appplemusic",
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
                    embed.setAuthor("YouTube Search", "https://imgs.search.brave.com/7jsMhMvKgy6iOxIH1TJEcPROR1N8OMrhmb8pP7fjTqc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMveW91dHViZS95/b3V0dWJlX1BORzEw/MjM0OS5wbmc")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setAuthor("Song Added To Queue")
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            } else if(songs.includes("spotify.com")) {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("Spotify Search", "https://imgs.search.brave.com/iU0U9bV0_moWfz1-uErg-TNbeENmtyYTXoXIcfZ8KMk/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly9ham91/cm5leWludG9zb3Vu/ZC5kZS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMi9zcG90/aWZ5X2xvZ28ucG5n")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setAuthor("Song Added To Queue")
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            } else if(songs.includes("soundcloud.com")) {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("SoundCloud Search", "https://imgs.search.brave.com/9rD65Zdo9HG1Vb-Yuwj1XvOI2aQSWEb_rAziPP4CNpY/rs:fit:855:855:1/g:ce/aHR0cHM6Ly9wbmdt/aW5kLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxOS8wOC9T/b3VuZGNsb3VkLUxv/Z28tUG5nLVRyYW5z/cGFyZW50LUJhY2tn/cm91bmQucG5n")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setAuthor("Song Added To Queue")
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            } else if(songs.includes("apple.com")) {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("AppleMusic Search", "https://imgs.search.brave.com/9N0Cx8Fp-42sG2FpGd6sDr7zXFsxx5Oy4T0thmWPDFo/rs:fit:920:768:1/g:ce/aHR0cHM6Ly9jbGlw/YXJ0Y3JhZnQuY29t/L2ltYWdlcy9hcHBs/ZS1tdXNpYy1sb2dv/LWNsaXBhcnQtc3Zn/LTYucG5n")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setAuthor("Song Added To Queue")
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            } else if(songs.includes("deezer.com")) {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("Deezer Search", "https://imgs.search.brave.com/FpCqroKYSVmiCxSpsiecHBQyTTGyKBNfVpR0xS-naEA/rs:fit:720:720:1/g:ce/aHR0cDovL2ltZy50/YWxrYW5kcm9pZC5j/b20vdXBsb2Fkcy8y/MDE0LzA2L0RlZXpl/ci1sb2dvLmpwZw")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setAuthor("Song Added To Queue")
                        embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
                        embed.setColor("BLUE")
                        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                        return msg.edit({ embeds: [embed] })
                    }, 5000)
                }
            }
            else {
                player.queue.add(res.tracks[0]);
                if (player.queue.length !== 0) {
                    embed.setAuthor("Query Search", "https://imgs.search.brave.com/7jsMhMvKgy6iOxIH1TJEcPROR1N8OMrhmb8pP7fjTqc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMveW91dHViZS95/b3V0dWJlX1BORzEw/MjM0OS5wbmc")
                    embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    let msg = await message.reply({ embeds: [embed] })
    
                    setTimeout(() => {
                        embed.setAuthor("Song Added To Queue")
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