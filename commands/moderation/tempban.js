const discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "tempban",
    description: "Bans a member for a specified amount of time",
    category: "moderation",
    ownerOnly: false,
    nsfwOnly: false,
    usage: "tempban <user> <time> [reason]",
    run: async(bot, message, args) => {
        let { guild, member } = message;
        let permission = member.permissions.has("BAN_MEMBERS");

        if(!permission) {
            let noperm = new discord.MessageEmbed()
            .setTitle("Missing Permissions")
            .setColor("RED")
            .setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`BAN_MEMBERS\` permission`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return message.reply({embeds: [noperm]})
        }
        let target = await message.mentions.users.first() || await bot.users.cache.get(args[0]);
        let duration = args[1];
        let reason = args.slice(2).join(" ")

        let time;
        let type;

        if(!target) {
            let nouser = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Please mention or provide user id for me to ban`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [nouser]})
        }
        if(!duration) {
            let noduration = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Please provide a duration to ban member for`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [noduration]})
        }

        try {
            const split = duration.match(/\d+|\D+/g);
            time = parseInt(split[0]);
            type = split[1].toLowerCase()
        } catch(err) {
            let invalidformat = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Invalid time format! correct format: 10d, 10h or 10m`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [invalidformat]})
        }

        if(type === 'h') {
            time *= 60
        } else if(type === 'd') {
            time *=60 * 24
        } else if(type !== 'm') {
            let wrongtime = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Please use "d", "h" or "m" to ban someone for days, hours or minutes`)
            .setColor("RED")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [wrongtime]})
        }

        if(target.id === message.author.id) {
                let authormention = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.error} You cannot ban yourself.`)
                .setColor("RED")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                return message.reply({embeds: [authormention]})
        }
            if(!reason) {
                reason = "Ban hammer has spoken."
            }

            const targetauthor = await guild.members.cache.get(target.id) || await guild.members.fetch(target.id);

            if(!targetauthor.bannable) {
                let notbannable = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.error} This author cannot be banned.`)
                .setColor("RED")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                return message.reply({embeds: [notbannable]})
            }


                targetauthor.ban({reason: reason})
                let banned = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.success} The author \`${targetauthor.author.tag}\` has been banned for \`${duration}\` with the reason \`${reason}\``)
                .setColor("BLUE")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                await message.reply({embeds: [banned]})

                setTimeout(async() => {
                   await guild.bans.remove(targetauthor.author.id)
                }, ms(duration))


    }
}