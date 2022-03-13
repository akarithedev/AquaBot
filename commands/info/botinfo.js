const os = require("os")
const moment = require("moment")
const discord = require("discord.js")
const { version } = require("./package.json");

module.exports = {
    name: "botinfo",
    description: "Shows the bot information",
    category: "info",
    aliases: ["stats", "bot-stats"],
    ownerOnly: false,
    run: async(bot, message, args) => {
        let textChannels = bot.channels.cache.filter(c => c.type === "GUILD_TEXT").size;
        let voiceChannels = bot.channels.cache.filter(c => c.type === "GUILD_VOICE").size;
        let stageChannels = bot.channels.cache.filter(c => c.type === "GUILD_STAGE").size;
        let users = bot.users.cache.filter(u => !u.bot).size;
        let developers = bot.users.cache.get(bot.devs);

        let array = [
            `**Bot Developers**: \`${developers.filter(u => u.tag).join(", ")}\``,
            `**Channels**:`,
            `Text Channels: \`${textChannels}\``,
            `Voice Channels: \`${voiceChannels}\``,
            `Stage Channels: \`${stageChannels}\``,
            `**Users**: \`${users}\``
            `**Versions**:`,
            `DiscordJs Version: \`${discord.Version}\``,
            `Bot Version: \`${version}\``,
            `NodeJs Version: \`${process.version}\``
        ]
        bot.embed.setAuthor("Bot Information")
        .setThumbnail(bot.user.displayAvatarURL({format: "png", size: 4096}))
        .setColor("BLUE")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))

        message.reply({embeds: [bot.embed]})
    }
}