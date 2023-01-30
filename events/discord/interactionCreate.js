const discord = require("discord.js")
module.exports.run = async(bot, interaction) => {
	if(!interaction.isCommand()) return;
    
	let command = bot.slashCommands.get(interaction.commandName);
	if(!command) return;
	let blacklist = await bot.database.get(`blacklist_${interaction.user.id}`)
	if(blacklist === "Yes") {
		const embed = new discord.MessageEmbed()
		.setTitle("Blacklisted")
		.setDescription(`${bot.emoji.error} I am sorry but you are blacklisted.`)
		.setColor("RED")
		return interaction.reply({ embeds: [embed], ephemeral: true });
	  } else {
		console.log("")
	  }
	if(command.ownerOnly) {
		if (!bot.devs.includes(interaction.user.id)) {
            const embed1 = new discord.MessageEmbed()
            .setTitle("Command Error")
            .setDescription(`${bot.emoji.error} You do not have permission to use this command.`)
            .setColor("RED")
            return interaction.reply({ embeds: [embed1] })
        }
	}
	if(command.nsfwOnly) {
		if(!interaction.channel.nsfw) {
				const embed2 = new discord.MessageEmbed()
				.setTitle("Command Error")
				.setDescription(`${bot.emoji.error} This command can be used only in nsfw channels`)
				.setColor("RED")
				return interaction.reply({ embeds: [embed2] })
		}
	  }
	command.run(bot, interaction, interaction.options);
}