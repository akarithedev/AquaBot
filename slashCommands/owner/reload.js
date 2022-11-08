const discord = require("discord.js");

module.exports = {
    name: "reload",
    category: "owner",
    description: "Reloads a command",
    ownerOnly: true,
    nsfwOnly: false,
    options: [{
        name: "command",
        description: "reloads the specified command",
        type: "STRING",
        required: true
    }],
    run: async(bot, interaction, args) => {
        let command = args.getString("command")

        if(!command) {
            let noargs = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription("Please provide a command name to reload")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [noargs] })
        }

        let cmd = await bot.slashCommands.get(command);
        if(!cmd) {
            let nocmd = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`There is no command called \`${bot.utils.capitalise(command)}\``)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [nocmd] })
        }
        try { 
            delete require.cache[require.resolve(`../../slashCommands/${cmd.category}/${command}.js`)];
            bot.slashCommands.delete(command);
            const pull = require(`../../slashCommands/${cmd.category}/${command}.js`);
            bot.slashCommands.set(command, pull);

            let cmreloaded = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`\`${bot.utils.capitalise(command)}\` command successfully reloaded`)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [cmreloaded] })

        } catch(err) {
            let reloaderr = new discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`\`${bot.utils.capitalise(command)}\` command couldn't be reloaded`)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return interaction.reply({ embeds: [reloaderr] })
        }

        }
    }