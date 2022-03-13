const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "shuffle",
    description: "Shuffles the queue",
    category: "music",
    aliases: ["qshuff"],
    ownerOnly: false,
    run: async(bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.players.get(message.guild.id);

        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the shuffle command.`)
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

        player.queue.shuffle();
        embed.setDescription(`${bot.emoji.success} The queue is now shuffled.`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.reply({embeds: [embed]})

    }
}