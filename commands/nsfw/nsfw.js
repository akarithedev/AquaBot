const discord = require("discord.js")
const Nsfw = require('../../structures/NsfwHandler');

module.exports = {
	name: "nsfw",
	category: "nsfw",
	description: "see a nsfw image/gif.",
	aliases: [],
	ownerOnly: false,
  nsfwOnly: true,
	run: async (bot, message, args) => {
		let types = [
			'hentai',
			'pussy',
			'neko',
			'lesbian',
			'kuni',
			'cumsluts',
			'boobs',
			'classic',
			'blowjob',
			'yuri',
			'tits',
			'solo',
			'feet'
		]
		if(!args[0]) {
			let embed = new discord.MessageEmbed()
				.setTitle('No type provided')
				.setDescription(`${bot.emoji.error} You must provide a type of nsfw. Available types: \`${types.join(', ')}\``)
				.setColor('RED')
				.setTimestamp();
			message.reply({embeds:[embed]});
			return; 
		}
		let type = args[0].toLowerCase();
		if(!types.includes(type)) {
			let embed = new discord.MessageEmbed()
				.setTitle('Invalid type provided')
				.setDescription(`${bot.emoji.error} The type you provided is invalid. Available types: \`${types.join(', ')}\``)
				.setColor('RED')
				.setTimestamp();
			message.reply({embeds:[embed]});
			return;
		}
		let data = await Nsfw[type]();
		let embed = new discord.MessageEmbed()
			.setTitle('Here\'s your nsfw image!')
			.setImage(data)
			.setColor('GREEN')
			.setTimestamp();
		message.reply({embeds:[embed]});
	}
}