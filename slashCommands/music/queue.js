const discord = require("discord.js")
const embed = new discord.eEmbed()
const ms = require("parse-ms")

module.exports = {
    name: "queue",
    description: "Shows the queue list",
    category: "music",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "page",
        description: "page number",
        type: "NUMBER",
        required: false
    }],
    run: async (bot, interaction, args) => {
        let voiceChannel = interaction.member.voice.channel;
        let player = bot.music.players.get(interaction.guild.id);

        if (!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the loop command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            interaction.reply({ embeds: [embed] })
            return;
        }

        if (!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            interaction.reply({ embeds: [embed] })
            return;
        }

        if (player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            interaction.reply({ embeds: [embed] })
            return;
        }


        let queue = player.queue
        let autoplay = player.get("autoplay")
        const multiple = 10;
        const page = args.getNumber("page") ? args.getNumber("page") : 1;

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
        embed.setAuthor(`Queue for guild ${interaction.guild.name}`)
        embed.setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true, format: "png" }))
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
        interaction.reply({ embeds: [embed] })
        return;


    }
}