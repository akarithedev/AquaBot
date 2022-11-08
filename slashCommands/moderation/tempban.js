const discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "tempban",
    description: "Bans a member for a specified amount of time",
    category: "moderation",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "target",
        description: "The target to ban",
        type: "USER",
        required: true
    },
    {
        name: "duration",
        description: "The duration to ban member for",
        type: "STRING",
        required: true
    },
    {
        name: "reason",
        description: "The reason to ban member for",
        type: "STRING",
        required: false
    }],
    usage: "tempban <user> <time> [reason]",
    run: async(bot, interaction, args) => {
        let { guild, member } = interaction;
        let permission = member.permissions.has("BAN_MEMBERS");

        if(!permission) {
            let noperm = new discord.MessageEmbed()
            .setTitle("Missing Permissions")
            .setColor("RED")
            .setDescription(`${bot.emoji.error} You do not have the required permissions to use this command. You need \`BAN_MEMBERS\` permission`)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

            return interaction.reply({embeds: [noperm]})
        }
        let target = args.getUser("target")
        let duration = args.getString("duration")
        let reason = args.getString("reason")

        let time;
        let type;
        try {
            const split = duration.match(/\d+|\D+/g);
            time = parseInt(split[0]);
            type = split[1].toLowerCase()
        } catch(err) {
            let invalidformat = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Invalid time format! correct format: 10d, 10h or 10m`)
            .setColor("RED")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [invalidformat]})
        }

        if(type === 'h') {
            time *= 60
        } else if(type === 'd') {
            time *=60 * 24
        } else if(type !== 'm') {
            let wrongtime = new discord.MessageEmbed()
            .setDescription(`${bot.emoji.error} Please use "d", "h" or "m" to ban someone for days, hours or minutes`)
            .setColor("RED")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return interaction.reply({embeds: [wrongtime]})
        }

        if(target.id === interaction.user.id) {
                let usermention = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.error} You cannot ban yourself.`)
                .setColor("RED")
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                return interaction.reply({embeds: [usermention]})
        }
            if(!reason) {
                reason = "Ban hammer has spoken."
            }

            const targetUser = await guild.members.cache.get(target.id) || await guild.members.fetch(target.id);

            if(!targetUser.bannable) {
                let notbannable = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.error} This user cannot be banned.`)
                .setColor("RED")
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                return interaction.reply({embeds: [notbannable]})
            }


                targetUser.ban({reason: reason})
                let banned = new discord.MessageEmbed()
                .setDescription(`${bot.emoji.success} The user \`${targetUser.user.tag}\` has been banned for \`${time}\` with the reason \`${reason}\``)
                .setColor("BLUE")
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
                await interaction.reply({embeds: [banned]})

                setTimeout(async() => {
                   await guild.bans.remove(targetUser.user.id)
                }, ms(duration))


    }
}