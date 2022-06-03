const discord = require("discord.js");
const slashCommandHandler = require('../../handlers/slashCommandHandler');
const CommandHandler = require('../../handlers/CommandHandler');

module.exports.run = async(bot) => {
	bot.user.setActivity(`Advanced Bot`, { type: "WATCHING" })
	console.log(`Connected as ${bot.user.tag}`)
	bot.music.init(bot.user.id)
	bot.database.connect();
	CommandHandler(bot, true);
	setInterval(() => {
		slashCommandHandler.handle(bot);
	}, 2000);
}