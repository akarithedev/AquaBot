const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "remove",
    category: "music",
    description: "removes a song from queue.",
    aliases: ["unqueue", "rem"],
    ownerOnly: false,
    run: async(bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let songnumber = args[0];
        let player = bot.music.players.get(message.guild.id);


        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the remove command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
         
        if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(args[0] === "0") {
        embed.setDescription(`${bot.emoji.error} You cannot remove the current song from the queue.`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.reply({embeds: [embed]})
    }
        const trackTitle = player.queue[songnumber - 1].title
        const trackNumber = [songnumber -1];

        player.queue.remove(trackNumber)
        embed.setDescription(`${bot.emoji.success} Removed \`${trackTitle}\` from the queue.`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.reply({embeds: [embed]})

    }
}