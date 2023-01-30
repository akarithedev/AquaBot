const discord = require("discord.js");
const slashCommandHandler = require('../../handlers/slashCommandHandler');
const CommandHandler = require('../../handlers/CommandHandler');
const fetch = require("node-fetch").default

module.exports.run = async(bot) => {
	const Ip = "play.aqua-network.xyz";

	const response = await fetch(`https://api.mcsrvstat.us/2/${Ip}`);
    const json = await response.json();
    const embed = new discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle((json.hostname || Ip))
    .setThumbnail(`https://media.discordapp.net/attachments/1050136995390836777/1056335515395313725/logoAquaNetwork_64x64.png`)
    .addField("IP", `${json.ip}`)
    .addField("Port", `${json.port}`)
    .addField("Status", `${json.online ? "Online" : "Offline"}`)
    .addField("Version", `${json.version}`)
    .addField("Players", `${json.players ? json.players.online : "Unknown"}`)
    .addField("Max Players", `${json.players ? json.players.max : "Unknown"}`)
    .setTimestamp();
    
	let msg1 = await bot.channels.cache.get("944238747740938301").send({embeds: [embed]})

	setInterval(async() => {
	const Ip = "play.aqua-network.xyz";

	const response = await fetch(`https://api.mcsrvstat.us/2/${Ip}`);
    const json = await response.json();

    const embed1 = new discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle((json.hostname || Ip))
    .setThumbnail(`https://media.discordapp.net/attachments/1050136995390836777/1056335515395313725/logoAquaNetwork_64x64.png`)
    .addField("IP", `${json.ip}`)
    .addField("Port", `${json.port}`)
    .addField("Status", `${json.online ? "Online" : "Offline"}`)
    .addField("Version", `${json.version}`)
    .addField("Players", `${json.players ? json.players.online : "Unknown"}`)
    .addField("Max Players", `${json.players ? json.players.max : "Unknown"}`)
    .setTimestamp();
    
	return msg1.edit({embeds: [embed]}, {embeds: [embed1]})
	}, 60000)
	bot.user.setActivity(`Advanced Bot`, { type: "WATCHING" })
	console.log(`Connected as ${bot.user.tag}`)
	bot.music.init(bot.user.id)
	bot.database.connect();
	CommandHandler(bot, true);
	setInterval(() => {
		slashCommandHandler.handle(bot);
	}, 2000);
}