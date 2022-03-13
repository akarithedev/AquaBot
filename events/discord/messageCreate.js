const discord = require("discord.js")

module.exports.run = async(bot, message) => {
    if (!message.guild) return;
    if (!message.author) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(bot.prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if (!command) {
        const embed = new discord.MessageEmbed()
        .setTitle("Command Error")
        .setDescription(`${bot.emoji.error} This command does not exist`)
        .setColor("RED")
        console.log(`User ${message.author.tag} tried to use a non existent command (${command})`)
        return message.reply({ embeds: [embed] })
    }
    if (command.ownerOnly) {
        if (!bot.devs.includes(message.author.id)) {
            const embed2 = new discord.MessageEmbed()
            .setTitle("Command Error")
            .setDescription(`${bot.emoji.error} You do not have permission to use this command.`)
            .setColor("RED")
            console.log(`User ${message.author.tag} tried to use a restricted command (${command})`)
            return message.reply({ embeds: [embed2] })
        }
    }
    if (command) command.run(bot, message, args)
}