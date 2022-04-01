const discord = require("discord.js")

module.exports = {
    name: "help",
    description: "Display bot commands",
    category: "info",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "command",
        description: "command name to see its information",
        type: "STRING",
        required: false
    }],
    run: async(bot, interaction, args) => {
       const command = await bot.slashCommands.get(args.getString("command"));
       const cmdname = args.getString("command")
       if(!cmdname) {
       let embed = new discord.MessageEmbed()
       .setColor("BLUE")
       .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
       .setTitle(`${bot.user.username} Help`)
       .setDescription(`Hi, i'm a multi purpose bot`)
       .setThumbnail(bot.user.displayAvatarURL({format: "png", size: 2048}))

       let categories;
  
        if(!bot.devs.includes(interaction.user.id)) {
				categories = bot.utils.removeDuplicates(bot.slashCommands.filter(cmd => cmd.category !== 'owner').map(cmd => cmd.category));
			} else {
				categories = bot.utils.removeDuplicates(bot.slashCommands.map(cmd => cmd.category));
			}
      if(!interaction.channel.nsfw) {
				categories = bot.utils.removeDuplicates(bot.slashCommands.filter(cmd => cmd.category !== 'nsfw').map(cmd => cmd.category));
			} else {
				categories = bot.utils.removeDuplicates(bot.slashCommands.map(cmd => cmd.category));
			}
      
			for (const category of categories) {
				embed.addField(`${bot.utils.capitalise(category)}`, bot.slashCommands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(', '))
			}
			return interaction.reply({embeds: [embed]})

       } else {

        if (!command) {
          let nocmd = new discord.MessageEmbed()
          .setTitle("No Command")
          .setDescription(`No command was found with this name`)
          .setColor("RED")
          .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
          return interaction.reply({embeds: [nocmd]})
        }
         let cmdinfo = new discord.MessageEmbed()
         .setTitle(`${bot.user.username} Help`)
         .setDescription(`**Command**: \`${command.name}\`\n**Category**: \`${command.category}\`\n**Description**: \`${command.description}\`\n**Owner Only**: \`${command.ownerOnly ? "true" : "false"}\`\n**Nsfw Only**: \`${command.nsfwOnly ? "true" : "false"}\``)
         .setColor("BLUE")
         .setThumbnail(bot.user.displayAvatarURL({format: "png", size: 2048}))
         .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        return interaction.reply({embeds: [cmdinfo]})
        }
    }
}