const discord = require("discord.js")
const fetch = require("node-fetch").default;
const embed = new discord.MessageEmbed()
module.exports = {
    name: "status",
    description: "shows server status",
    aliases: ["aquastatus"],
    category: "info",
    run: async(bot, message, args) => {

        let ip = "play.aqua-network.xyz";

        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
        const json = await response.json();

        if(!json.online) {
            embed.setDescription("The server is offline so no status for you")
            embed.setColor("BLUE")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        } else {
            embed.setAuthor("Aqua Network", message.guild.iconURL({dynamic: true, format: 'png', size: 2048}))
            embed.setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${ip.toLowerCase()}`)
            let array = [
                `**Ip**: \`${json.ip}\``,
                `**Port**: \`${json.port || "Default"}\``,
                `**Online**: \`${json.online ? "Yes": "No"}\``,
                `**Version**: \`${json.version || "0"}\``,
                `**Players**: \`${json.players ? json.players.online : "0"}/${json.players ? json.players.max : "0"}\``
            ]
            embed.setDescription(array.join("\n"))
            if (json.motd && json.motd.clean && json.motd.clean.length > 1) embed.addField("Motd", `\`${json.motd.clean.length > 100 ? `${json.motd.clean.slice(0, 100)}...` : json.motd.clean}\``);
            return message.reply({embeds: [embed]})
        }

    }
}