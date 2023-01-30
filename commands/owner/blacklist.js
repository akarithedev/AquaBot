const discord = require("discord.js")

module.exports = {
    name: "blacklist",
    description: "Puts a bad person on the black list",
    aliases: ["bl"],
    category: "owner",
    nsfwOnly: false,
    ownerOnly: true,
    run: async(bot, message, args) => {
        let option = args[0];
        let target = await message.mentions.users.first() || await bot.users.cache.get(args[1])
        if(!option) {
          let nooption = new discord.MessageEmbed()
          .setDescription(bot.emoji.error + " Please provide an option")
          .setColor("BLUE")
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
          return message.reply({embeds: [nooption]})
        } else if(option === "add") {
            if(!target) {
                let nomember = new discord.MessageEmbed()
                .setDescription(bot.emoji.error + " Please mention or provide an user id to black list")
                .setColor("RED")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [nomember]})
            } else {
                let blacklist = await bot.database.fetch(`blacklist_${target.id}`)
                if(blacklist === "No") {
                    await bot.database.set(`blacklist_${target.id}`, "Yes")
                    let embed = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.success} User has been successfully added to black list. Use \`${bot.prefix}blacklist remove\` to remove them if you want to`)
                .setColor("BLUE")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            } else if(blacklist === null) {
                await bot.database.set(`blacklist_${target.id}`, "Yes")
                let embed = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.success} User has been successfully added to black list. Use \`${bot.prefix}blacklist remove\` to remove them if you want to`)
            .setColor("BLUE")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({embeds: [embed]})
            } else {
                let embed = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.error} This user is already in the database`)
                .setColor("BLUE")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }
            }
        } else if(option === "remove") {
            if(!target) {
                let nomember = new discord.MessageEmbed()
                .setDescription(bot.emoji.error + " Please mention or provide an user id to remove from black list")
                .setColor("RED")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [nomember]})
            } else {
                let blacklist = await bot.database.fetch(`blacklist_${target.id}`)
                if(blacklist === "Yes") {
                    await bot.database.set(`blacklist_${target.id}`,"No");
                    let embed = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.success} User has been successfully removed from black list. Use \`${bot.prefix}blacklist add\` to add them back if you want to`)
                .setColor("BLUE")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            } else {
                let embed = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.error} This user is already removed from black list`)
                .setColor("BLUE")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }
        }
    }

    }
}