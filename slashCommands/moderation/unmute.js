const discord = require("discord.js")
const mutedrole = "Muted";
const moment = require("moment")
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "unmutes an user who was muted",
    ownerOnly: false,
    nsfwOnly: false,
    options:[{
        name: "target",
        description: "mention the user",
        type: "USER",
        required: true
    }],
    run: async(bot, interaction, args) => {
        const { guild } = interaction;
        const member = await guild.members.cache.get(interaction.user.id) || await guild.members.fetch(interaction.user.id);
       let permission = member.permissions.has("MANAGE_ROLES");

        if(!permission) {
            let embed = new discord.MessageEmbed()
            .setTitle("Missing Permissions")
            .setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`MANAGE_ROLES\` permission`)
            .setColor("RED")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }
        const target = args.getUser("target")

        if(target.id === interaction.user.id) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} You are already unmuted :>`)
            .setColor("RED")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }


const targetuser = await guild.members.cache.get(target.id) || await guild.members.fetch(target.id);        
        let muterole = interaction.guild.roles.cache.find(role => role.name === mutedrole);
        if(!muterole) {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${bot.emoji.error} The muted role is missing. Are you sure that the role exists on the server? if not, simply create one named \`Muted\``)
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
              return interaction.reply({embeds: [embed]})
            
        }


  if(!targetuser.roles.cache.some(role => role.name === mutedrole)) {
      let embed = new discord.MessageEmbed()
      .setDescription(`${bot.emoji.error} The member is already unmuted`)
      .setColor("RED")
      .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
    return interaction.reply({embeds: [embed]})
  }

  let embed = new discord.MessageEmbed()
  .setAuthor("Unmuted", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  .setDescription(`${bot.emoji.success} The user \`${target.tag}\` has been successfully unmuted.`)
  .setColor("BLUE")
  .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  targetuser.roles.remove(muterole.id)
  return interaction.reply({embeds: [embed]})


    }
}