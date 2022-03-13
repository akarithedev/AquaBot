const discord = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["commands", "cmds"],
    category: "info",
    description: "Display bot commands",
    ownerOnly: false,
    run: async(bot, message, args) => {
       const command = await bot.commands.get(args[0]) || await bot.commands.get(bot.aliases.get(args[0]));
       if(!args[0]) {
       let embed = new discord.MessageEmbed()
       .setColor("BLUE")
       .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
       .setTitle(`${bot.user.username} Help`)
       .setDescription(`Hi there, I'm a bot made by Sweetie for Aqua Network\n**PREFIX**: \`${bot.prefix}\``)
       .setThumbnail(bot.user.displayAvatarURL({format: "png", size: 2048}))

       let categories;
  
        if(!bot.devs.includes(message.author.id)) {
				categories = bot.utils.removeDuplicates(bot.commands.filter(cmd => cmd.category !== 'owner').map(cmd => cmd.category));
			} else {
				categories = bot.utils.removeDuplicates(bot.commands.map(cmd => cmd.category));
			}
			for (const category of categories) {
				embed.addField(`${bot.utils.capitalise(category)}`, bot.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(', '))
			}
      if(!message.channel.nsfw) {
				categories = bot.utils.removeDuplicates(bot.commands.filter(cmd => cmd.category !== 'nsfw').map(cmd => cmd.category));
			} else {
				categories = bot.utils.removeDuplicates(bot.commands.map(cmd => cmd.category));
			}
			for (const category of categories) {
				embed.addField(`${bot.utils.capitalise(category)}`, bot.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(', '))
			}
			return message.reply({embeds: [embed]})

       } else {

        if (!command) {
          let nocmd = new discord.MessageEmbed()
          .setTitle("No Command")
          .setDescription(`No command was found with this name/alias`)
          .setColor("RED")
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
          return message.reply({embeds: [nocmd]})
        }
         let cmdinfo = new discord.MessageEmbed()
         .setTitle(`${bot.user.username} Help`)
         .setDescription(`**Command**: \`${command.name}\`\n**Category**: \`${command.category}\`\n**Description**: \`${command.description}\`\n**Aliases**: ${command.aliases ? command.aliases.map(alias => `\`${alias}\``).join(', ') : 'No aliases found'}\n**Owner Only?**: \`${command.ownerOnly ? "true" : "false"}\``)
         .setColor("BLUE")
         .setThumbnail(bot.user.displayAvatarURL({format: "png", size: 2048}))
         .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return message.reply({embeds: [cmdinfo]})
        }
    }
}