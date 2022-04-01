const discord = require("discord.js")
const embed = new discord.MessageEmbed()
const lyricsFinder = require("lyrics-finder")

module.exports = {
    name: "lyrics",
    category: "music",
    description: "Searches for lyrics of a song.",
    aliases: ["ly", "find-lyrics"],
    ownerOnly: false,
    run: async (bot, message, args) => {
        let artist = args.slice(0).join(" ");
        let track = args.slice(1).join(" ")
        if(!artist) {
            embed.setDescription(`${bot.emoji.error} Please provide the song artist name`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
        if(!track) {
          embed.setDescription(`${bot.emoji.error} Please provide the song name`)
          embed.setColor("BLUE")
          embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
          return message.reply({ embeds: [embed] })
      }
        let lyrics = await lyricsFinder(artist, track) || "No lyrics found"
       let embed1 = new discord.MessageEmbed()
	        .setDescription(`${bot.emoji.searching} Searching lyrics for \`${track}\``)
	        .setColor("BLUE")
	        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
        let msg = await message.reply({embeds: [embed1]})
        
				if(lyrics === null) {
          setTimeout(() => {
					let notfoundlyric = new discord.MessageEmbed()
						.setTitle("No lyrics")
						.setDescription(`${bot.emoji.error} No lyrics found for this song`)
						.setColor("RED")
					msg.edit({embeds: [notfoundlyric]})
          }, 5000)
					return;
				}
        setTimeout(async() => {
					let lyricembed = new discord.MessageEmbed()
						.setTitle(`${bot.utils.capitalise(track)} - Lyrics`)
						.setDescription(lyrics.length > 1900 ? `\`\`\`${lyrics.substr(0, 1900)}...\`\`\`` : `\`\`\`${lyrics}\`\`\``)
						.setColor("BLUE")
					msg.edit({embeds: [lyricembed]})
        }, 5000)

    }
}