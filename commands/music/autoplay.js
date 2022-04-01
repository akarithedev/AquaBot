const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "autoplay",
    category: "music",
    description: "Enables/disables autoplay.",
    aliases: ["automaticplay"],
    ownerOnly: false,
    run: async (bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.get(message.guild.id);
        let option = args[0]

        if (!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the autoplay command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
        if (!option) {
            embed.setDescription(`${bot.emoji.error} You must set an option.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
        if (option === "on") {
            if(!player.get("autoplay")) {
            const identifier = player.queue.current.identifier;

            player.set("autoplay", true);
            player.set("requester", message.author);
            player.set("identifier", identifier);
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            res = await player.search(search, message.author);
            player.queue.add(res.tracks[1]);
            embed.setDescription(`${bot.emoji.success} Autoplay is now turned **on**`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
            } else {
                embed.setDescription(`${bot.emoji.error} Autoplay is already turned on`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
        } else if(option === "off") {
            if(player.get("autoplay")) {
            player.set("autoplay", false);
            player.queue.clear();
            embed.setDescription(`${bot.emoji.success} Autoplay is now turned **off**`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
            } else {
                embed.setDescription(`${bot.emoji.error} Autoplay is already turned off`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
        } else {
            embed.setDescription(`${bot.emoji.error} You must provide a valid option`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
    }
}