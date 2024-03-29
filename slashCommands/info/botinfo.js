const os = require("os")
const moment = require("moment")
const discord = require("discord.js")
const { version } = require("../../package.json");

module.exports = {
    name: "botinfo",
    description: "Shows the bot information",
    category: "info",
    ownerOnly: false,
    nsfwOnly: false,
    options: [],
    run: async(bot, interaction, args) => {
        let textChannels = bot.channels.cache.filter(c => c.type === "GUILD_TEXT").size;
        let voiceChannels = bot.channels.cache.filter(c => c.type === "GUILD_VOICE").size;
        let stageChannels = bot.channels.cache.filter(c => c.type === "GUILD_STAGE_VOICE").size;
        let users = bot.users.cache.filter(u => !u.bot).size;
        let guilds = bot.guilds.cache.size;
      let developers = bot.devs.map(a => bot.users.cache.get(a))
        let array = [
            `**Bot Creation**: \`${bot.user.createdAt.toUTCString()}\``,
            `**Channels**:`,
            `Text Channels: \`${textChannels}\``,
            `Voice Channels: \`${voiceChannels}\``,
            `Stage Channels: \`${stageChannels}\``,
            `**Users**: \`${users}\``,
            `**Guilds**: \`${guilds}\``,
            `**Voice Connections**: \`${bot.voice.adapters.size}\``,
            `**Versions**:`,
            `DiscordJs Version: \`${discord.version}\``,
            `Bot Version: \`${version}\``,
            `NodeJs Version: \`${process.version}\``
        ]
        bot.embed.setAuthor("Bot Information")
        .setThumbnail(bot.user.displayAvatarURL({format: "png", size: 4096}))
        .setColor("BLUE")
        .setDescription(array.join("\n"))
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

        return interaction.reply({embeds: [bot.embed]})
    }
}