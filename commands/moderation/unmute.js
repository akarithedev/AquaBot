const discord = require("discord.js")
const mutedrole = "Muted";
const moment = require("moment")
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "unmutes an user who was muted",
    ownerOnly: false,
    run: async(bot, message, args) => {
        let permission = message.member.permissions.has("MANAGE_ROLES");

        if(!permission) {
            let embed = new discord.MessageEmbed()
            .setTitle("Missing Permissions")
            .setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`MANAGE_ROLES\` permission`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
        const target = message.mentions.users.first() || await bot.users.fetch(args[0])
        if(!target) {
            embed.setColor("RED")
            embed.setDescription(`${bot.emoji.error} Please mention or provide an user id to unmute.`)
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return message.reply({embeds: [embed]})
        }

        if(target.id === message.author.id) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} You are already unmuted :>`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }


const targetuser = await message.guild.members.cache.get(target.id) || await message.guild.members.fetch(target.id);        
        let muterole = message.guild.roles.cache.find(role => role.name === mutedrole);
        if(!muterole) {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${bot.emoji.error} The muted role is missing. Are you sure that the role exists on the server? if not, simply create one named \`Muted\``)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
              return message.reply({embeds: [embed]})
            
        }


  if(!targetuser.roles.cache.get(muterole.id)) {
      let embed = new discord.MessageEmbed()
      .setDescription(`${bot.emoji.error} The member is already unmuted`)
      .setColor("RED")
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
    return message.reply({embeds: [embed]})
  }

if(target) {
  let embed = new discord.MessageEmbed()
  .setAuthor("Unmuted", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  .setDescription(`${bot.emoji.success} The user \`${target.tag}\` has been successfully unmuted.`)
  .setColor("BLUE")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  message.reply({embeds: [embed]})
  targetuser.roles.remove(muterole.id)
}


    }
}