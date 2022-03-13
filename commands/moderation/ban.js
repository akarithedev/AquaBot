const discord = require("discord.js")
const permission = "BAN_MEMBERS";
const embed = new discord.MessageEmbed();

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans a member permanently",
    ownerOnly: false,
    usage: "ban <user> <reason>",
    run: async(bot, message, args) => {
        let target = message.mentions.users.first() || await bot.users.fetch(args[0])
        let reason = args.slice(1).join("");

        if(!message.member.permissions.has(permission)) {
            embed.setTitle("Missing Permissions")
            embed.setColor("RED")
            embed.setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`BAN_MEMBERS\` permission`)
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return message.reply({embeds: [embed]})
    
        }

        if(!target) {
            embed.setColor("RED")
            embed.setDescription(`${bot.emoji.error} Please mention or provide an user id for me to ban.`)
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return message.reply({embeds: [embed]})
        }

        if(target.id === message.author.id) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Haha funny, you cannot ban yourself :>`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(!reason) {
            reason = "Ban hammer has spoken."
        }
            const targetUser = message.guild.members.cache.get(target.id) || await message.guild.members.fetch(target.id);
       
        if(!targetUser.bannable) {
            embed.setColor("RED")
            embed.setDescription(`${bot.emoji.error} You cannot ban this user.`)
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return message.reply({embeds: [embed]})
        }

        if(target) {
            targetUser.ban({reason: reason})
            embed.setAuthor("User Banned", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            embed.setDescription(`${bot.emoji.success} The user \`${target.tag}\` has been successfully banned.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
           return message.reply({embeds: [embed]})
          }

    }
}