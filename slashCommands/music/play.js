const ms = require("parse-ms")
const discord = require("discord.js");
const embed = new discord.MessageEmbed()

module.exports = {
    name: "play",
    description: "Play a song or a playlist from youtube/spotify/soundcloud/deezer/appplemusic",
    category: "music",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "song",
        description: "track url/query",
        type: "STRING",
        required: true
    }], 
    run: async (bot, interaction, args) => {
        const { guild } = interaction;
				const member = await guild.members.cache.get(interaction.user.id) || await guil.members.fetch(interaction.user.id);
        let voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            embed.setColor("BLUE")
            embed.setDescription("You need to be in a voice channel in order to play music.")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            interaction.reply({ embeds: [embed] })
        }

        let songs;
        try {
            songs = args.getString("song")
            let res = await bot.music.search(songs, member.user)

            let player = bot.music.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channelId,
                textChannel: interaction.channel.id,
                volume: 50,
                autoplay: null
            });


            if (player.voiceChannel !== voiceChannel.id) {
                embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                interaction.reply({ embeds: [embed] })
                return;
            }
            if (player.state !== "CONNECTED") player.connect()

            if (res.loadType === "NO_MATCHES") {
                if (!player.queue.current) player.destroy();
                embed.setDescription(`${bot.emoji.error} I couldn't found any song called: \`${songs}\``)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return interaction.editReply({ embeds: [embed] })

            }

            if (res.loadType === "PLAYLIST_LOADED") {
                player.queue.add(res.tracks);

                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                embed.setDescription(`${bot.emoji.success} Added playlist \`${res.playlist.name}\` to queue.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return interaction.editReply({ embeds: [embed] })
            }
						player.queue.add(res.tracks[0]);
						if (player.queue.length !== 0) {
                            await interaction.deferReply();
                            let type = getType(songs);
                            let image = getImage(songs);
                            embed.setAuthor(`${type} Search`, image)
                            embed.setDescription(`${bot.emoji.searching} Looking for \`${songs}\``)
                            embed.setColor("BLUE")
                            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                            await interaction.editReply({ embeds: [embed] })
								setTimeout(() => {
										embed.setAuthor("Song Added To Queue")
										embed.setDescription(`${bot.emoji.success} Successfully added **[${res.tracks[0].title}](${res.tracks[0].uri})** to the queue.`)
										embed.setColor("BLUE")
										embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
										return interaction.editReply({ embeds: [embed] })
								}, 5000)
						} else {
								await interaction.deleteReply();
						}
            if (!player.playing && !player.paused && !player.queue.size) player.play();
        } catch (e) {
            embed.setDescription(`${bot.emoji.error} ERROR: \`${e.message}\``)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
					if(interaction.deferred) {
            return interaction.editReply({ embeds: [embed] })
					} else {
            return interaction.reply({ embeds: [embed] })
					}
        }
    }
}

function getType(query) {
	if(query.includes("youtube.com") || query.includes("youtu.be"))
		return 'YouTube';
	if(query.includes('spotify.com'))
		return 'Spotify';
	if(query.includes('soundcloud.com'))
		return 'SoundCloud';
	if(query.includes('apple.com'))
		return 'AppleMusic';
	if(query.includes('deezer.com'))
		return 'Deezer';
	return 'Query';
}

function getImage(query) {
	if(query.includes("youtube.com") || query.includes("youtu.be"))
		return 'https://imgs.search.brave.com/7jsMhMvKgy6iOxIH1TJEcPROR1N8OMrhmb8pP7fjTqc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMveW91dHViZS95/b3V0dWJlX1BORzEw/MjM0OS5wbmc';
	if(query.includes('spotify.com'))
		return 'https://imgs.search.brave.com/iU0U9bV0_moWfz1-uErg-TNbeENmtyYTXoXIcfZ8KMk/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly9ham91/cm5leWludG9zb3Vu/ZC5kZS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMi9zcG90/aWZ5X2xvZ28ucG5n';
	if(query.includes('soundcloud.com'))
		return 'https://imgs.search.brave.com/9rD65Zdo9HG1Vb-Yuwj1XvOI2aQSWEb_rAziPP4CNpY/rs:fit:855:855:1/g:ce/aHR0cHM6Ly9wbmdt/aW5kLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxOS8wOC9T/b3VuZGNsb3VkLUxv/Z28tUG5nLVRyYW5z/cGFyZW50LUJhY2tn/cm91bmQucG5n';
	if(query.includes('apple.com'))
		return 'https://imgs.search.brave.com/9N0Cx8Fp-42sG2FpGd6sDr7zXFsxx5Oy4T0thmWPDFo/rs:fit:920:768:1/g:ce/aHR0cHM6Ly9jbGlw/YXJ0Y3JhZnQuY29t/L2ltYWdlcy9hcHBs/ZS1tdXNpYy1sb2dv/LWNsaXBhcnQtc3Zn/LTYucG5n';
	if(query.includes('deezer.com'))
		return 'https://imgs.search.brave.com/FpCqroKYSVmiCxSpsiecHBQyTTGyKBNfVpR0xS-naEA/rs:fit:720:720:1/g:ce/aHR0cDovL2ltZy50/YWxrYW5kcm9pZC5j/b20vdXBsb2Fkcy8y/MDE0LzA2L0RlZXpl/ci1sb2dvLmpwZw';
	return 'https://imgs.search.brave.com/7jsMhMvKgy6iOxIH1TJEcPROR1N8OMrhmb8pP7fjTqc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMveW91dHViZS95/b3V0dWJlX1BORzEw/MjM0OS5wbmc';
}