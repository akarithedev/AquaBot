const discord = require("discord.js")
let embed = new discord.MessageEmbed()

module.exports = {
    name: "uptime",
    description: "Shows the bot's uptime",
    aliases: ["botup"],
    category: "info",
    run: async(bot, message, args) => {
        
        function duration(ms) {
			const sec = Math.floor((ms/ 1000) % 60).toString()
			const min = Math.floor((ms/ (1000 * 60)) % 60).toString()
			const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
			const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
		}

        embed.setTitle("My uptime")
        embed.setDescription(`\`\`\`${duration(bot.uptime)}\`\`\``)
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        message.reply({embeds: [embed]})
    }
}