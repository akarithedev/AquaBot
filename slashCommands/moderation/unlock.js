module.exports = {
    name: "unlock",
    description: "unlocks the channel",
    category: "moderation",
    ownerOnly: false,
    nsfwOnly: false,
    options: [],
    run: async(bot, interaction, args) => {
        const { guild } = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
        let permission = member.permissions.has("MANAGE_CHANNELS");
        if(!permission) {
            bot.embed.setTitle("Missing Permissions")
            .setColor("RED")
            .setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`MANAGE_CHANNELS\` permission`)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return interaction.reply({embeds: [embed]})
        }

        if(interaction.channel.permissionOverwrites.set([{
            id: interaction.guild.id,
            allow: ['SEND_MESSAGES']
          }])) { 
              bot.embed.setDescription(`${bot.emoji.success} The channel has been unlocked.`)
              .setColor("BLUE")
              .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
              return interaction.reply({embeds: [bot.embed]})
          }
    }
}