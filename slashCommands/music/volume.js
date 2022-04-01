const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "volume",
    description: "Changes the song volume.",
    category: "music",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "number",
        description: "A number between 1 and 100 to set the volume",
        type: "NUMBER",
        required: true
    }],
    run: async(bot, interaction, args) => {
        const { guild } = interaction;
        let member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
        let voiceChannel = member.voice.channel;
        let volume = args.getNumber("number");
        let player = bot.music.players.get(interaction.guild.id);


        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the volume command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            interaction.reply({embeds: [embed]})
          return;
        }

        if(!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            interaction.reply({embeds: [embed]})
            return;
        }
         
        if(player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            interaction.reply({embeds: [embed]})
            return;
        }


        if(volume > 100) {
            embed.setDescription(`${bot.emoji.error} You should provide a number between 1 and 100`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            interaction.reply({embeds: [embed]})
            return;
        }

        player.setVolume(volume);
        embed.setDescription(`${bot.emoji.success} Successfully set the volume to **${volume}**`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        interaction.reply({embeds: [embed]})
        return;
    }
}