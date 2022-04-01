const discord = require("discord.js")
const Nsfw = require('../../structures/NsfwHandler');

function selectType(name, value) {
    return {
      name: name,
      value: value ?? name
    }
  }

module.exports = {
	name: "nsfw",
	description: "see a nsfw image/gif.",
    category: "nsfw",
	ownerOnly: false,
    nsfwOnly: true,
    options: [{
        choices: [
            new selectType('hentai'),
            new selectType('pussy'),
            new selectType('neko'),
            new selectType('lesbian'),
            new selectType('kuni'),
            new selectType('cumsluts'),
            new selectType('boobs'),
            new selectType('classic'),
            new selectType('blowjob'),
            new selectType('yuri'),
            new selectType('tits'),
            new selectType('solo'),
            new selectType('feet'),
        ],
        name: "type",
        description: "choose a nsfw type",
        type: "STRING",
        required: true,
    }],
	run: async (bot, interaction, args) => {
		let type = args.getString("type")
		let data = await Nsfw[type]();
		let embed = new discord.MessageEmbed()
			.setTitle('Here\'s your nsfw image!')
			.setImage(data)
			.setColor('GREEN')
			.setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
			return interaction.reply({embeds:[embed]});
	}
}