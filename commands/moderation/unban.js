const discord = require("discord.js");
const permission = "BAN_MEMBERS";
const embed = new discord.MessageEmbed();

module.exports = {
    name: "unban",
    category: "moderation",
    description: "unbans the user who was previously banned",
    ownerOnly: false,
    usage: "unban <user>",
    run: async(bot, message, args) => {

      if(!message.member.permissions.has(permission)) {
        embed.setTitle("Missing Permissions")
        embed.setColor("RED")
        embed.setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`BAN_MEMBERS\` permission`)
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

        return message.reply({embeds: [embed]})

    }

    if(!args[0]) {
        embed.setColor("RED")
        embed.setDescription(`${bot.emoji.error} Please provide an user id`)
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

        return message.reply({embeds: [embed]})
    }
      
        if (isNaN(args[0])) {
            embed.setColor("RED")
            embed.setDescription(`${bot.emoji.error} Invalid identifier`)
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return message.reply({embeds: [embed]})
        }
        let FetchBan = await message.guild.bans.fetch();

    let targetUser;
    targetUser =
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.id.toLowerCase() === args[0].toLocaleLowerCase()
      );

    try {
      message.guild.members.unban(targetUser.user.id)
    } catch(err) {
        embed.setDescription(`${bot.emoji.error} The member you're trying to unban it is already unbanned`)
        embed.setColor("RED")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
       return message.reply({embeds: [embed]})
    }
            embed.setDescription(`${bot.emoji.success} The user \`${targetUser.user.tag}\` has been successfully unbanned.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
           return message.reply({embeds: [embed]})


    }
}