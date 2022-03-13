const discord = require("discord.js")
const mutedrole = "Muted";
const moment = require("moment")
module.exports = {
    name: "mute",
    category: "moderation",
    description: "Mutes an user who broke the rules permanently",
    aliases: ["permmute"],
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
        let reason = args.slice(1).join(" ");
        if(!target) {
            let embed = new discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`${bot.emoji.error} Please mention or provide an user id to mute.`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return message.reply({embeds: [embed]})
        }

        if(target.id === message.author.id) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Haha funny, you cannot mute yourself :>`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(target.bot) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} You are muting a bot, aren't you?`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

const targetuser = message.guild.members.cache.get(target.id) || await message.guild.members.fetch(target.id);        
        if(!reason) {
            reason = "No reason"
        }
        let muterole = message.guild.roles.cache.find(role => role.name === mutedrole);
        if(!muterole) {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${bot.emoji.error} The muted role is missing. Are you sure that the role exists on the server? if not, simply create one named \`Muted\``)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
              return message.reply({embeds: [embed]})
            
        }


  if(targetuser.roles.cache.some(role => role.name === mutedrole)) {
      let embed = new discord.MessageEmbed()
      .setDescription(`${bot.emoji.error} The member is already muted`)
      .setColor("RED")
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.reply({embeds: [embed]})
  }
if(target) {
  let embed = new discord.MessageEmbed()
  .setAuthor("Muted", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  .setDescription(`${bot.emoji.success} The user \`${target.tag}\` has been successfully muted.`)
  .setColor("BLUE")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  message.reply({embeds: [embed]})
  targetuser.roles.add(muterole.id)
}
    }
}