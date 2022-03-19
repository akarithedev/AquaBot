const discord = require("discord.js")
const embed = new discord.MessageEmbed()
const Genius = require("genius-lyrics")
const GeniusLyric = new Genius.Client("cg23HmOR9FsT_N-E5R0k02kdDTD-sCTGHSwMoBYkdNMUVQ4fHnIjMwTutQ8h1Cgn")

module.exports = {
    name: "lyrics",
    category: "music",
    description: "Searches for lyrics of a song.",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
      name: "song",
      description: "song name to search lyrics for",
      type: "STRING",
      required: true
    }],
    run: async (bot, interaction, args) => {
        const { guild } = interaction; 
        let player = bot.music.players.get(interaction.guild.id);
        let member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
        let voiceChannel = member.voice.channel;
        let track = args.getString("song")
        let findlyrics = await GeniusLyric.songs.search(track, {limit: track});
        let song = findlyrics[0];
       let embed1 = new discord.MessageEmbed()
	        .setDescription(`${bot.emoji.searching} Searching lyrics for \`${track}\``)
	        .setColor("BLUE")
	        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
        interaction.reply({embeds: [embed1]})
        
				if(findlyrics.length === 0 || song === null) {
          setTimeout(() => {
					let notfoundlyric = new discord.MessageEmbed()
						.setTitle("No lyrics")
						.setDescription(`${bot.emoji.error} No lyrics found for this song`)
						.setColor("RED")
				   interaction.editReply({embeds: [notfoundlyric]})
          }, 5000)
          return;
				}
        setTimeout(async() => {
			    let lyrics = await song.lyrics()

					let lyricembed = new discord.MessageEmbed()
						.setTitle(`${song.title} - Lyrics`)
						.setDescription(lyrics.length > 1900 ? `\`\`\`${lyrics.substr(0, 1900)}...\`\`\`` : `\`\`\`${lyrics}\`\`\``)
						.setThumbnail(song.thumbnail)
						.setColor("BLUE")
					interaction.editReply({embeds: [lyricembed]})
          return;
        }, 5000)

    }
}