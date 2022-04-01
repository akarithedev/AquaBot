const discord = require("discord.js")
const embed = new discord.MessageEmbed()
const ms = require("parse-ms")

module.exports = {
    name: "queue",
    description: "Shows the queue list",
    category: "music",
    aliases: ["q"],
    run: async (bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.players.get(message.guild.id);

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

        let queue = player.queue
        let autoplay = player.get("autoplay")
        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        const songs = tracks.map((t, i) => `> \`${start + (++i)}.\` **${t.title}**(\`${ms(t.duration).minutes}:${ms(t.duration).seconds}\`) - \`Requested by: ${t.requester.tag}\``);
        let array = [
            `**Now Playing**`,
            `> ${player.queue.current.title}`,
            ``,
            `**Up Next**`,
            `${tracks.length ? songs.join("\n") : "> No song(s) found in queue list"}`,
            ``,
            `**Queue Loop**: \`${player.queueRepeat ? "Yes" : "No"}\``,
            `**AutoPlay**: \`${autoplay ? "Yes" : "No"}\``

        ]
        embed.setDescription(array.join("\n"))
        embed.setColor("BLUE")
        embed.setTitle(`Queue for guild ${message.guild.name}`)
        embed.setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true, format: "png" }))
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
        message.reply({ embeds: [embed] })


    }
}