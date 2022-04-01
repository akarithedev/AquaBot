const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "avatar",
    description: "Show the user avatar",
    category: "misc",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "target",
        description: "tag the person to see their avatar",
        type: "USER",
        required: false,
    }],
    run: async(bot, interaction, args) => {
        let target = args.getUser("target") || interaction.user;

        embed.setImage(target.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        embed.setColor("BLUE")
        embed.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [embed]})
    }
}