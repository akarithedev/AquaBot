const discord = require("discord.js");

module.exports = {
    name: "reload",
    category: "owner",
    description: "Reloads a command",
    aliases: ["rcmd", "command_reload"],
    usage: "reload <command>",
    ownerOnly: true,
    nsfwOnly: false,
    run: async(bot, message, args) => {
        let command = args[0].toLowerCase();

        if(!command) {
            let noargs = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription("Please provide a command name to reload")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [noargs] })
        }

        let cmd = await bot.commands.get(command) || await bot.commands.get(bot.aliases.get(command));
        if(!cmd) {
            let nocmd = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`There is no command called \`${bot.utils.capitalise(command)}\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [nocmd] })
        }
        try { 
            delete require.cache[require.resolve(`../../commands/${cmd.category}/${command}.js`)];
            bot.commands.delete(command);
            const pull = require(`../../commands/${cmd.category}/${command}.js`);
            bot.commands.set(command, pull);

            let cmreloaded = new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`\`${bot.utils.capitalise(command)}\` command successfully reloaded`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [cmreloaded] })

        } catch(err) {
            let reloaderr = new discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`\`${bot.utils.capitalise(command)}\` command couldn't be reloaded`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [reloaderr] })
        }

        }
    }