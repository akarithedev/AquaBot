const discord = require("discord.js")
const mutedrole = "Muted";
const ms = require("ms")
module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "temp-mutes an user who broke the rules",
    aliases: ["temp-mute"],
    ownerOnly: false,
    options: [{
        name: "target",
        description: "user id or tag",
        type: "USER",
        required: true
    },
    {
        name: "time",
        description: "the amount of time for user to be muted",
        type: "STRING",
        required: true

    },
    {
        name: "reason",
        description: "reason to mute the user",
        type: "STRING",
        required: false

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
        let reason = args.getString("reason")
        let time = args.getString("time")
 
        if(target.id === interaction.user.id) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Haha funny, you cannot mute yourself :>`)
            .setColor("RED")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }

        if(target.bot) {
            let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} You are muting a bot, aren't you?`)
            .setColor("RED")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [embed]})
        }

const targetuser = await guild.members.cache.get(target.id) || await guild.members.fetch(target.id);
        if(!reason) {
            reason = "No reason"
        }
        let muterole = guild.roles.cache.find(role => role.name === mutedrole);
        if(!muterole) {
            let embed = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${bot.emoji.error} The muted role is missing. Are you sure that the role exists on the server? if not, simply create one named \`Muted\``)
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
              return interaction.reply({embeds: [embed]})
            
        }

  if(targetuser.roles.cache.some(role => role.name === mutedrole)) {
      let embed = new discord.MessageEmbed()
      .setDescription(`${bot.emoji.error} The member is already muted`)
      .setColor("RED")
      .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]})
  }
if(target) {
  let embed = new discord.MessageEmbed()
  .setAuthor("Temp-Muted", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  .setDescription(`${bot.emoji.success} The user \`${target.tag}\` has been successfully temp muted.`)
  .setColor("BLUE")
  .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
  interaction.reply({embeds: [embed]})
  targetuser.roles.add(muterole.id)
}

setTimeout(async() => {
    await targetuser.roles.remove(muterole.id);
}, ms(time))

    }
}