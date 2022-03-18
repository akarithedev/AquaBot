const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "stop",
    description: "Stops the music client",
    category: "music",
    options: [],
    run: async(bot, interaction, args) => {
        const { guild } = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guil.members.fetch(interaction.user.id);
        let voiceChannel = member.voice.channel;
        let player = bot.music.players.get(interaction.guild.id);

        if(!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the stop command.`)
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


        player.destroy();
        embed.setDescription(`${bot.emoji.success} Successfully stopped the music client.`)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]});
    }
}