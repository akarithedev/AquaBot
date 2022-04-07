const discord = require("discord.js");
const permission = "BAN_MEMBERS";
const embed = new discord.MessageEmbed();

module.exports = {
    name: "unban",
    category: "moderation",
    description: "unbans the user who was previously banned",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "target",
        description: "user id to unban",
        type: "STRING",
        required: true
    }],
    run: async(bot, interaction, args) => {
        const { guild } = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
     
     
        if(!member.permissions.has(permission)) {
        embed.setTitle("Missing Permissions")
        embed.setColor("RED")
        embed.setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`BAN_MEMBERS\` permission`)
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

        return interaction.reply({embeds: [embed]})

    }

    if(isNaN(args.getString("target"))) {
        embed.setColor("RED")
        embed.setDescription(`${bot.emoji.error} Please provide a valid identifier`)
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

        return interaction.reply({embeds: [embed]})
    }
        let FetchBan = await guild.bans.fetch();

    let targetUser;
    targetUser =
      FetchBan.get(args.getString("target")) ||
      FetchBan.find(
        bm => bm.user.id.toLowerCase() === args.getString("target").toLocaleLowerCase()
      );

    try {
      guild.members.unban(targetUser.user.id)
    } catch(err) {
        embed.setDescription(`${bot.emoji.error} The user couldn't be found`)
        embed.setColor("RED")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
       return interaction.reply({embeds: [embed]})
    }
    embed.setAuthor("User Unbanned", targetUser.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            embed.setDescription(`${bot.emoji.success} The user \`${targetUser.user.tag}\` has been successfully unbanned.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
           return interaction.reply({embeds: [embed]})


    }
}