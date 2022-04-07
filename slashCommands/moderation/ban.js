const discord = require("discord.js")
const permission = "BAN_MEMBERS";
const embed = new discord.MessageEmbed();

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans a member permanently",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "target",
        description: "mention the user or provide id",
        type: "USER",
        required: true,

    },
{
    name: "reason",
    description: "reason to ban member for",
    type: "STRING",
    required: false
}],
    run: async(bot, interaction, args) => {
        const { guild } = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
        let target = args.getUser("target");
        let reason = args.getString("reason")

        if(!member.permissions.has(permission)) {
            embed.setTitle("Missing Permissions")
            embed.setColor("RED")
            embed.setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`BAN_MEMBERS\` permission`)
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return interaction.reply({embeds: [embed]})
    
        }


        if(target.id === interaction.user.id) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Haha funny, you cannot ban yourself :>`)
            .setColor("RED")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }

        if(!reason) {
            reason = "Ban hammer has spoken."
        }
            const targetUser = await interaction.guild.members.cache.get(target.id) || await interaction.guild.members.fetch(target.id);
       
        if(!targetUser.bannable) {
            embed.setColor("RED")
            embed.setDescription(`${bot.emoji.error} You cannot ban this user.`)
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return interaction.reply({embeds: [embed]})
        }

        if(target) {
            targetUser.ban({reason: reason})
            embed.setAuthor("User Banned", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            embed.setDescription(`${bot.emoji.success} The user \`${target.tag}\` has been successfully banned.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
           return interaction.reply({embeds: [embed]})
          }

    }
}