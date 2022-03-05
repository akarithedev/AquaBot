const discord = require("discord.js")
const moment = require("moment")
module.exports = {
    name: "report",
    category: "misc",
    description: "reports an user who is against the rules.",
    ownerOnly: false,
    run: async(bot, message, args) => {
        let target = message.mentions.users.first() || bot.users.cache.get(args[0])
        let reason = args.slice(1).join(" ")

        if(!target) {
            let embed = new discord.MessageEmbed()
            .setDescription("Please mention a user to report.")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }
        if(!reason) {
            let embed = new discord.MessageEmbed()
            .setDescription("Please provide a reason.")
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        if(target && target.id !== message.guild.owner.id) {
            let embed = new discord.MessageEmbed()
            embed.setAuthor("Reported", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            embed.setDescription(`The user \`${target.tag}\` has been successfully reported.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            let channel = bot.channels.cache.get("945074033681117185");
            let embed2 = new discord.MessageEmbed()
            embed2.setAuthor("New Report", target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            embed2.setDescription(`**Target** ➜ \`${target.tag}\`\n**Reporter** ➜ \`${message.author.tag}\`\n**Reason** ➜ \`${reason}\`\n**Reported on** ➜ \`${moment(message.createdTimestamp).format('LT')} ${moment(message.createdTimestamp).format('LL')}\``)
            embed2.setColor("BLUE")
            await channel.send(embed2)
           return message.reply({embeds: [embed]})
          } 
    }
}