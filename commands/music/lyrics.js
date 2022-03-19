const discord = require("discord.js")
const embed = new discord.MessageEmbed()
const Genius = require("genius-lyrics")
const GeniusLyric = new Genius.Client("cg23HmOR9FsT_N-E5R0k02kdDTD-sCTGHSwMoBYkdNMUVQ4fHnIjMwTutQ8h1Cgn")

module.exports = {
    name: "lyrics",
    category: "music",
    description: "Searches for lyrics of a song.",
    aliases: ["ly", "find-lyrics"],
    ownerOnly: false,
    run: async (bot, message, args) => {
        let player = bot.music.players.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;
        let track;
        try {
            track = args.join(" ");
        if(!args.length) {
            embed.setDescription(`${bot.emoji.error} Please provide a song name.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
        let findlyrics = await GeniusLyric.songs.search(track, {limit: track});
        let song = findlyrics[0];
        let lyrics = song.lyrics()
        let embed1 = new discord.MessageEmbed()
        .setDescription(`${bot.emoji.searching} Searching lyrics for \`${track}\``)
        .setColor("BLUE")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
        let msg = await message.reply({embeds: [embed1]})

        setTimeout(() => {
            if(!lyrics) {
                let notfoundlyric = new discord.MessageEmbed()
                .setTitle("No lyrics")
                .setDescription(`${bot.emoji.error} No lyrics found for this song`)
                .setColor("RED")
                return msg.edit({embeds: [notfoundlyric]})
            }
            let lyricembed = new discord.MessageEmbed()
            .setTitle(`${song.title} - Lyrics`)
            .setDescription(lyrics.length > 1900 ? `\`\`\`${lyrics.substr(0, 1900)}...\`\`\`` : `\`\`\`${lyrics}\`\`\``)
            .setThumbnail(song.thumbnail)
            .setColor("BLUE")
            return msg.edit({embeds: [lyricembed]})
        }, 5000)

    } catch(err) {
        embed.setDescription(`${bot.emoji.error} ERROR: ${err.message}.`)
        embed.setColor("RED")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
        return message.reply({ embeds: [embed] })
    }
    }
}