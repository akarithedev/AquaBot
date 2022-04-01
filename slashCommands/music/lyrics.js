const discord = require("discord.js")
const embed = new discord.MessageEmbed()
const lyricsFinder = require("lyrics-finder")

module.exports = {
    name: "lyrics",
    description: "Searches for lyrics of a song.",
    category: "music",
    ownerOnly: false,
    nsfwOnly: false,
    options: [
      {
        name: "artist",
        description: "song's artist name",
        type: "STRING",
        required: true
      },
      {
      name: "song",
      description: "song name to search lyrics for",
      type: "STRING",
      required: true
    }],
    run: async (bot, interaction, args) => {
        const { guild } = interaction; 
        let player = bot.music.players.get(interaction.guild.id);
        let member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
        let artist = args.getString("artist")
        let track = args.getString("song")
        let lyrics = await lyricsFinder(artist, track) || "No lyrics found";
       let embed1 = new discord.MessageEmbed()
	        .setDescription(`${bot.emoji.searching} Searching lyrics for \`${track}\``)
	        .setColor("BLUE")
	        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
        interaction.reply({embeds: [embed1]})
        
        setTimeout(async() => {
					let lyricembed = new discord.MessageEmbed()
						.setTitle(`${bot.utils.capitalise(track)} - Lyrics`)
						.setDescription(lyrics.length > 1900 ? `\`\`\`${lyrics.substr(0, 1900)}...\`\`\`` : `\`\`\`${lyrics}\`\`\``)
						.setColor("BLUE")
					return interaction.editReply({embeds: [lyricembed]})
        }, 5000)

    }
}