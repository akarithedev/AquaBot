const moment = require("moment")
const discord = require("discord.js")
module.exports = {
    name: "userinfo",
    description: "Shows the user information",
    category: "info",
    aliases: ["ui"],
    ownerOnly: false,
    run: async(bot, message, args) => {
        const embed = new discord.MessageEmbed()
        const member = message.mentions.members.first() || await message.guild.members.cache.get(args[0]) || message.member;
        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'HypeSquad Bravery',
            HOUSE_BRILLIANCE: 'HypeSquad Brilliance',
            HOUSE_BALANCE: 'HypeSquad Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer',
            DISCORD_NITRO: 'Discord Nitro'
        };

        let stat = {
            online: "https://emoji.gg/assets/emoji/9166_online.png",
            idle: "https://emoji.gg/assets/emoji/3929_idle.png",
            dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
            offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
          }

          const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);

		const userFlags = await member.user.flags.toArray()

let array1 = [
    `**Username:** ${member.user.username}#${member.user.discriminator}`,
    `**User Identifier:** ${member.id}`,
    `**Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join("\n") : 'None'}`,
    `**Bot:** ${member.user.bot ? "Yes" : "No"}`,
    `**Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' })})`,
    `**Created At:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
]
let array2 = [
    `**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
    `**Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
    `**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
    `**Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? client.utils.trimArray(roles) : 'None'}`
]
embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png'}))
embed.setColor('BLUE')
embed.addField('User Information', array1.join("\n"))
embed.addField('Member Information', array2.join("\n"))
embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: "png", size: 4096}))
return message.reply({embeds: [embed]});
}
}