const ms = require("parse-ms")
const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "play",
    description: "Play a song or a playlist from youtube",
    category: "music",
    aliases: ["p", "psong", "search"],
    run: async(bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        if(!voiceChannel) {
            embed.setColor("BLUE")
            embed.setDescription("You need to be in a voice channel in order to play music.")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        let songs;
        try {
            songs = args.join(" ")
            let res = await bot.music.search(songs, message.author)

            let player = bot.music.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channelId,
                textChannel: message.channel.id,
                volume: 100,
              });

              if(player.voiceChannel !== voiceChannel.id) {
                  embed.setDescription("I'm being used in another voice channel.")
                  embed.setColor("BLUE")
                  embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                  return message.reply({embeds: [embed]})
              }

              if(!songs) {
                  embed.setDescription("You need to provide a song name or a song url")
                  embed.setColor("BLUE")
                  embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                  return message.reply({embeds: [embed]})
              }

              if(player.voiceChannel !== voiceChannel.id) {
                embed.setDescription("I'm being used in another voice channel.")
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                return message.reply({embeds: [embed]})
            }

            if(player.state !== "CONNECTED") player.connect()

            if(res.loadType === "NO_MATCHES") {
                if(!player.queue.current) player.destroy();
                embed.setDescription(`I couldn't found any song called: \`${songs}\``)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                return message.reply({embeds: [embed]})

            }

            if(res.loadType === "PLAYLIST_LOADED") {
                player.queue.add(res.tracks);

                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                embed.setDescription(`Adding playlist \`${res.playlist.name}\` with \`${res.tracks.length}\` songs`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                return message.reply({embeds: [embed]})
            }
            player.queue.add(res.tracks[0]);
            if(player.queue.length !== 0) {
                embed.setDescription(`Searching for \`${songs}\``)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                let msg = await message.reply({embeds: [embed]})

                setTimeout(() => {
                    embed.setDescription(`Successfully added \`${res.tracks[0].title}\` to the queue.`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                    return msg.edit({embeds: [embed]})
                }, 5000)
            }
            if (!player.playing && !player.paused && !player.queue.size) player.play();
        } catch(e) {
            embed.setDescription(`ERROR: \`${e.message}\``)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
    }
}