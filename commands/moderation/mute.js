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
        let permission = message.member.hasPermission("MANAGE_ROLES");
        const client = bot;

        if(!permission) {
            let embed = new discord.MessageEmbed()
            .setTitle("Missing Permissions")
            .setDescription("You do not have the required permissions to use this command. You need `MANAGE_ROLES` permission")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }
        const target = message.mentions.users.first() || client.users.cache.get(args[0])
        let reason = args.slice(1).join(" ");

        if(!target) {
            let embed = new discord.MessageEmbed()
            .setDescription("Please mention or provide a member id for me to mute")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }

        if(target.id === message.author.id) {
            let embed = new discord.MessageEmbed()
            .setDescription("Haha funny, you cannot mute yourself :>")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }

        if(target.bot) {
            let embed = new discord.MessageEmbed()
            .setDescription("You are muting a bot, aren't you?")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
        }
        if(target.id === message.guild.owner.id) {
            let embed = new discord.MessageEmbed()
            .setDescription("Haha, you cannot mute the server owner :joy:")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
             }

        const targetuser = message.guild.members.cache.get(target.id);
        if(!reason) {
            reason = "No reason LOL"
        }
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
            .setDescription("The user cannot be muted. Maybe check the roles?")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.lineReply(embed)
  }


  if(targetuser.roles.cache.some(role => role.name === mutedrole)) {
      let embed = new discord.MessageEmbed()
      .setDescription("The member is already muted")
      .setColor("RED")
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.lineReply(embed)
  }
if(target && target.id !== message.guild.owner.id) {
  let embed = new discord.MessageEmbed()
  .setAuthor("Muted", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  .setDescription(`**Target** ➜ \`${target.tag}\`\n**Moderator/Admin** ➜ \`${message.author.tag}\`\n**Reason** ➜ \`${reason}\`\n**Muted on** ➜ \`${moment(message.createdTimestamp).format('LT')} ${moment(message.createdTimestamp).format('LL')}\`\n**Duration** ➜ \`Permanent\``)
  .setColor("BLUE")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  message.channel.send(embed)
  targetuser.roles.add(muterole.id)
}
    }
}