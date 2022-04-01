const discord = require("discord.js")

module.exports = {
    name: "howgay",
    category: "fun",
    description: "Shows you how gay you are :D",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "target",
        description: "tag the person to check their gay status :))",
        type: "USER",
        required: false
    }],
    run: async(bot, interaction, args) => {
        const target = args.getUser("target")
        let gay = Math.floor(Math.random() * 100);

        if(!target) {
            const embed = new discord.MessageEmbed()
            .setTitle("Gay Machine")
            .setColor("BLUE")
            .setDescription(`You are ${gay}% gay`)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({embeds: [embed]})

        } else {
            const embed = new discord.MessageEmbed()
            .setTitle("Gay Machine")
            .setColor("BLUE")
            .setDescription(`${target.tag} is ${gay}% gay`)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
           return interaction.reply({embeds: [embed]})

        }
}
}