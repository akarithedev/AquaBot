const discord = require("discord.js")
const mutedrole = "Muted";
const moment = require("moment")
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "unmutes an user who was muted",
    ownerOnly: false,
    run: async(bot, message, args) => {
        let permission = message.member.hasPermission("MANAGE_ROLES");

        if(!permission) {
            let embed = new discord.MessageEmbed()
            .setTitle("Missing Permissions")
            .setDescription("You do not have the required permissions to use this command. You need `MANAGE_ROLES` permission")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }

        let target = message.mentions.users.first() || bot.users.cache.get(args[0])
        if(!target) {
            let embed = new discord.MessageEmbed()
            .setDescription("Please mention or provide a member id")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }

        const targetuser = message.guild.members.cache.get(target.id);

        let muterole = message.guild.roles.cache.find(role => role.name === mutedrole);
        if(!muterole) {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription("The muted role is missing. Are you sure that the role exists on the server? if not, simply create one named `Muted`")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
              return message.lineReply(embed)
            
        }

        if(targetuser.roles.highest.position > message.member.roles.highest.position) {
			let embed = new discord.MessageEmbed()
            .setDescription("The user cannot be unmuted. Maybe check the roles?")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
  }


  if(!targetuser.roles.cache.some(role => role.name === mutedrole)) {
      let embed = new discord.MessageEmbed()
      .setDescription("The member is not muted")
      .setColor("RED")
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.lineReply(embed)
  }

if(target && target.id !== message.guild.owner.id) {
  let embed = new discord.MessageEmbed()
  .setAuthor("Unmuted", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  .setDescription(`**Target** ➜ \`${target.tag}\`\n**Moderator/Admin** ➜ \`${message.author.tag}\``)
  .setColor("BLUE")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  message.channel.send(embed)
  targetuser.roles.remove(muterole.id)
}


    }
}