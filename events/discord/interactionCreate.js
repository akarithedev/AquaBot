const discord = require("discord.js")

module.exports.run = async(bot, interaction) => {
	if(!interaction.isCommand()) return;
    
	let command = bot.slashCommands.get(interaction.commandName);
	if(!command) return;
	command.run(bot, interaction, interaction.options);
}