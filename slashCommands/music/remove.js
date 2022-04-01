const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "remove",
    category: "music",
    description: "removes a song from queue.",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "number",
        description: "song number from queue to remove",
        type: "NUMBER",
        required: true
    }],
    run: async(bot, interaction, args) => {
        const { guild } = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id)
        let voiceChannel = member.voice.channel;
        let songnumber = args.getNumber("number")
        let player = bot.music.players.get(interaction.guild.id);


        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the remove command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }

        if(!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }
         
        if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }


        if(songnumber === "0") {
        embed.setDescription(`${bot.emoji.error} You cannot remove the current song from the queue.`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]})
    }
    if(player.queue.length !== 1) {
        embed.setDescription(`${bot.emoji.error} There must be at least 1 song in the queue.`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]})
    }
        const trackTitle = player.queue[songnumber - 1].title
        const trackNumber = [songnumber -1];

        player.queue.remove(trackNumber)
        embed.setDescription(`${bot.emoji.success} Removed \`${trackTitle}\` from the queue.`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]})

    }
}