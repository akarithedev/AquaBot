const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "skip",
    description: "Skips the current song and jumps to the next one",
    category: "music",
    aliases: ["next"],
    run: async(bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.players.get(message.guild.id);

        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the skip command.`)
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

        player.stop();
        embed.setDescription(`${bot.emoji.success} **Skipped \`${player.queue.current.title}\`**`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        message.reply({embeds: [embed]})
    }
}