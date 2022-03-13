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
			'hentai'
		]
		if(!args[0]) {
			let embed = new discord.MessageEmbed()
				.setTitle('No type provided')
				.setDescription('Availale types: `'+types.join(', ')+'`')
				.setColor('RED')
				.setTimestamp();
			message.reply({embeds:[embed]});
			return; 
		}
		let type = args[0].toLowerCase();
		if(!types.includes(type)) {
			let embed = new discord.MessageEmbed()
				.setTitle('Invalid type provided')
				.setDescription('Availale types: `'+types.join(', ')+'`')
				.setColor('RED')
				.setTimestamp();
			message.reply({embeds:[embed]});
			return;
		}
		let { url } = Nsfw[type]();
		let embed = new discord.MessageEmbed()
			.setTitle('Here\'s your nsfw image!')
			.setImage(url)
			.setColor('GREEN')
			.setTimestamp();
		message.reply({embeds:[embed]});
	}
}