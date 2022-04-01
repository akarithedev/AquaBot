const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "say",
    description: "Repeats your text",
    category: "misc",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "text",
        description: "put whataver you want the bot to say",
        type: "STRING",
        required: true
    }],
    run: async(bot, interaction, args) => {
			await interaction.deferReply()
            
            embed.setDescription(args.getString("text"))
            embed.setColor("BLUE")
            interaction.channel.send({embeds: [embed]})
            await interaction.deleteReply()

    }
}