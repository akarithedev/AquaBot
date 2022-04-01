const discord = require("discord.js")
const embed = new discord.MessageEmbed()

module.exports = {
    name: "filters",
    category: "music",
    description: "Applies or disables an audio filter",
    aliases: [],
    ownerOnly: false,
    run: async(bot, message, args) => {
        let voiceChannel = message.member.voice.channel;
        let player = bot.music.players.get(message.guild.id);
        let filter = args[0]
        let filters = (await bot.database.get(`filters_${message.guild.id}`)) ?? [];
        if (!voiceChannel) {
            embed.setDescription(`${bot.emoji.error} You need to be in a voice channel to use the filters command.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (!player) {
            embed.setDescription(`${bot.emoji.error} There is no song/s playing within this guild.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if (player.voiceChannel !== voiceChannel.id) {
            embed.setDescription(`${bot.emoji.error} I'm being used in another voice channel.`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }
        if(!filter) {
            embed.setDescription(`${bot.emoji.error} Please provide a filter. Available filters: \`nightcore, vaporwave, bassboost, distort, 8D, vibrato\``)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({ embeds: [embed] })
        }

        if(filter === "nightcore") {
            if(!args[1]) {
                embed.setDescription(`${bot.emoji.error} Please provide a value (on/off)`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
            if(args[1] === "on") {
                if(!filters.includes("nightcore")) {
                    bot.database.set(`filters_${message.guild.id}`, [...filters, 'nightcore']);
                    player.setNightcore(true);
                    embed.setDescription(`${bot.emoji.success} Successfully applied the nightcore filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to hear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The nightcore filter is already applied`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else 
            if(args[1] === "off") {
                if(filters.includes("nightcore")) {
                    bot.database.set(`filters_${message.guild.id}`, filters.filter(a => a != 'nightcore'));
                    player.setNightcore(false);
                    embed.setDescription(`${bot.emoji.success} Successfully removed the nightcore filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to clear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The nightcore filter is not applied.`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else {
                embed.setDescription(`${bot.emoji.error} Not a valid value.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }
        } else if(filter === "vaporwave") {
            if(!args[1]) {
                embed.setDescription(`${bot.emoji.error} Please provide a value (on/off)`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
            if(args[1] === "on") {
                if(!filters.includes("vaporwave")) {
                    bot.database.set(`filters_${message.guild.id}`, [...filters, 'vaporwave']);
                    player.setVaporwave(true);
                    embed.setDescription(`${bot.emoji.success} Successfully applied the vaporwave filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to hear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The vaporwave filter is already applied`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else 
            if(args[1] === "off") {
                if(filters.includes("vaporwave")) {
                    bot.database.set(`filters_${message.guild.id}`, filters.filter(a => a != 'vaporwave'));
                    player.setVaporwave(false);
                    embed.setDescription(`${bot.emoji.success} Successfully removed the vaporwave filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to clear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The vaporwave filter is not applied.`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else {
                embed.setDescription(`${bot.emoji.error} Not a valid value.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }
        } else if(filter === "bassboost") {
            if(!args[1]) {
                embed.setDescription(`${bot.emoji.error} Please provide a value (on/off)`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
            if(args[1] === "on") {
                if(!filters.includes("bassboost")) {
                    bot.database.set(`filters_${message.guild.id}`, [...filters, 'bassboost']);
                    player.setBassboost(true);
                    embed.setDescription(`${bot.emoji.success} Successfully applied the bassboost filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to hear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The bassbooost filter is already applied`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else 
            if(args[1] === "off") {
                if(filters.includes("bassboost")) {
                    bot.database.set(`filters_${message.guild.id}`, filters.filter(a => a != 'bassboost'));
                    player.setBassboost(false);
                    embed.setDescription(`${bot.emoji.success} Successfully removed the bassboost filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to clear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The bassboost filter is not applied.`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else {
                embed.setDescription(`${bot.emoji.error} Not a valid value.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }
        } else if(filter === "distort") {
            if(!args[1]) {
                embed.setDescription(`${bot.emoji.error} Please provide a value (on/off)`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
            if(args[1] === "on") {
                if(!filters.includes("distort")) {
                    bot.database.set(`filters_${message.guild.id}`, [...filters, 'distort']);
                    player.setDistortion(true);
                    embed.setDescription(`${bot.emoji.success} Successfully applied the distort filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to hear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The distort filter is already applied`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else 
            if(args[1] === "off") {
                if(filters.includes("distort")) {
                    bot.database.set(`filters_${message.guild.id}`, filters.filter(a => a != 'distort'));
                    player.setDistortion(false);
                    embed.setDescription(`${bot.emoji.success} Successfully removed the distort filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to clear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The distort filter is not applied.`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else {
                embed.setDescription(`${bot.emoji.error} Not a valid value.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }
        } else if(filter === "8d") {
            if(!args[1]) {
                embed.setDescription(`${bot.emoji.error} Please provide a value (on/off)`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
            if(args[1] === "on") {
                if(!filters.includes("8D")) {
                    bot.database.set(`filters_${message.guild.id}`, [...filters, '8D']);
                    player.set8D(true);
                    embed.setDescription(`${bot.emoji.success} Successfully applied the 8D audio filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to hear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The 8D audio filter is already applied`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else 
            if(args[1] === "off") {
                if(filters.includes("8D")) {
                    bot.database.set(`filters_${message.guild.id}`, filters.filter(a => a != '8D'));
                    player.set8D(false);
                    embed.setDescription(`${bot.emoji.success} Successfully removed the 8D audio filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to clear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The 8D audio filter is not applied.`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                } 
            } else {
                embed.setDescription(`${bot.emoji.error} Not a valid value.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }

        } else if(filter === "vibrato") {
            if(!args[1]) {
                embed.setDescription(`${bot.emoji.error} Please provide a value (on/off)`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({ embeds: [embed] })
            }
            if(args[1] === "on") {
                if(!filters.includes("vibrato")) {
                    bot.database.set(`filters_${message.guild.id}`, [...filters, 'vibrato']);
                    player.setVibrato(true);
                    embed.setDescription(`${bot.emoji.success} Successfully applied the vibrato filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to hear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The vibrato filter is already applied`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else 
            if(args[1] === "off") {
                if(filters.includes("vibrato")) {
                    bot.database.set(`filters_${message.guild.id}`, filters.filter(a => a != 'vibrato'));
                    player.setVibrato(false);
                    embed.setDescription(`${bot.emoji.success} Successfully removed the vibrato filter`)
                    embed.setColor("BLUE")
                    embed.setFooter("It can take up to 15 seconds to clear the effect")
                    return message.reply({embeds: [embed]})
                } else {
                    embed.setDescription(`${bot.emoji.error} The vibrato filter is not applied.`)
                    embed.setColor("BLUE")
                    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                    return message.reply({embeds: [embed]})
                }
            } else {
                embed.setDescription(`${bot.emoji.error} Not a valid value.`)
                embed.setColor("BLUE")
                embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
                return message.reply({embeds: [embed]})
            }
        }
        else {
            embed.setDescription(`${bot.emoji.error} **${filter}** Is not a valid filter`)
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            return message.reply({embeds: [embed]})
        }

    }
}