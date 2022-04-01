const discord = require("discord.js");
const slashCommandHandler = require('../../handlers/slashCommandHandler');
const CommandHandler = require('../../handlers/CommandHandler');

module.exports.run = async(bot) => {
	bot.user.setActivity(`Advanced Bot`, { type: "WATCHING" })
	console.log(`Connected as ${bot.user.tag}`)
	bot.music.init(bot.user.id)
	bot.database.connect();
	CommandHandler(bot, true);
	setTimeout(() => {
		slashCommandHandler.handle(bot);
	}, 2000); // 2 secunde dupa ce va fi ready, ca sa poata da load la servere. 
}