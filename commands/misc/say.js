const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "say",
    description: "Repeats your text",
    category: "misc",
    aliases: [""],
    run: async(bot, message, args) => {
        if(!args.length) {
            embed.setDescription(` ${bot.emoji.error} You must provide some text`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        } else {
			message.delete()
            embed.setDescription(args.join(" "))
            embed.setColor("BLUE")
            return message.channel.send({embeds: [embed]})
        }
    }
}