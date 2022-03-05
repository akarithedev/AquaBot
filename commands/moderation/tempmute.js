const discord = require("discord.js")
const mutedrole = "Muted";
const moment = require("moment")
const ms = require("ms")
module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "temp-mutes an user who broke the rules",
    aliases: ["temp-mute"],
    ownerOnly: false,
    run: async(bot, message, args) => {
        let permission = message.member.permissions.has("MANAGE_ROLES");

        if(!permission) {
            let embed = new discord.MessageEmbed()
            .setTitle("Missing Permissions")
            .setDescription("You do not have the required permissions to use this command. You need `MANAGE_ROLES` permission")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
        const target = message.mentions.users.first() || await bot.users.fetch(args[0])
        let reason = args.slice(2).join(" ");
        let time = args[1];
        if(!target) {
            let embed = new discord.MessageEmbed()
            .setDescription("Please mention or provide a member id for me to mute")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
        if(!time) {
            let embed = new discord.MessageEmbed()
            .setDescription("You forgot the duration bro/sis")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
        if(target.id === message.author.id) {
            let embed = new discord.MessageEmbed()
            .setDescription("Haha funny, you cannot mute yourself :>")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(target.bot) {
            let embed = new discord.MessageEmbed()
            .setDescription("You are muting a bot, aren't you?")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

const targetuser = message.guild.members.cache.get(target.id) || await message.guild.members.fetch(target.id);
        if(!reason) {
            reason = "No reason LOL"
        }
        let muterole = message.guild.roles.cache.find(role => role.name === mutedrole);
        if(!muterole) {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription("The muted role is missing. Are you sure that the role exists on the server? if not, simply create one named `Muted`")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
              return message.reply({embeds: [embed]})
            
        }



  if(targetuser.roles.cache.some(role => role.name === mutedrole)) {
      let embed = new discord.MessageEmbed()
      .setDescription("The member is already muted")
      .setColor("RED")
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.reply({embeds: [embed]})
  }
if(target) {
  let embed = new discord.MessageEmbed()
  .setAuthor("Temp-Muted", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  .setDescription(`The user \`${target.tag}\` has been successfully temp-muted.`)
  .setColor("BLUE")
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  message.reply({embeds: [embed]})
  targetuser.roles.add(muterole.id)
}

setTimeout(async() => {
    await targetuser.roles.remove(muterole.id);
}, ms(time))

    }
}