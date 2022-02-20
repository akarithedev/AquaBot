const discord = require("discord.js")
const embed = new discord.MessageEmbed()
const ms = require("parse-ms")

module.exports = {
    name: "queue",
    description: "Shows the queue list",
    category: "music",
    aliases: ["q"],
    run: async(bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.get(message.guild.id);

        if(!voiceChannel) {
            embed.setDescription("You need to be in a voice channel to use the queue command.")
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }

        if(!player) {
            embed.setDescription("There is no song/s playing within this guild.")
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }
         
        if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription("I'm being used in another voice channel.")
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }

        if(!player) {
            embed.setDescription("There is no song/s playing within this guild.")
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }

        const queue = player.queue.map((t, i) => `> \`${++i}.\` **${t.title}**(\`${ms(t.duration).minutes}:${ms(t.duration).seconds}\`) - \`Requested by: ${t.requester.tag}\``);
              const chunked = bot.utils.chunk(queue, 10).map(x => x.join("\n"));
                embed.setDescription([
                    `**Now Playing**`,
                    `> ${player.queue.current ? player.queue.current.title : "No song"}`,
                    ``,
                    `**Queue List**`,
                    `${chunked[0] ? chunked[0] : "> No song(s) found in queue list"}`
                ])
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                try {
                  const queueMsg = await message.lineReply(embed);
                  if (chunked.length > 1) await bot.utils.pagination(queueMsg, message.author, chunked);
              } catch (e) {
                  message.lineReply(`An error occured: ${e.message}.`);
              }

    }
}