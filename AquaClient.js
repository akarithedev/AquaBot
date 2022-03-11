var http = require('http');

http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);

const discord = require("discord.js");
const Intents = discord.Intents;
const bot = new discord.Client({ intents: 32767, ws: { properties: { $browser: "Discord Android" } }});
const fs = require("fs");
const { token, prefix, owner } = require("./config.json");
const Util = require("./AquaUtil.js");
const { Manager } = require("erela.js");
const { nodes } = require("./config.json");
const embed = new discord.MessageEmbed()
const { Database } = require("quickmongo");
const { config } = require("dotenv");
const Spotify = require("erela.js-spotify");
const Apple = require("erela.js-apple");
const clientID = "ea41a85d7f444e25b83942adb2dfba70";
const clientSecret = "1b8016b912d64aee80b1980ae0ada45c";
require("./structures/lavaplayer");

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.categories = fs.readdirSync("./commands")
bot.prefix = prefix;
bot.devs = owner;
bot.utils = new Util(bot);
bot.snek = require("axios");
bot.database = new Database(`mongodb+srv://aquadb:aquadb557@aqua1.3zpil.mongodb.net/AquaBotretryWrites=true&w=majority`);
bot.music = new Manager({
    nodes,
    defaultSearchPlatform: 'youtube music',
    autoPlay: true,
    send(id, payload) {
        const guild = bot.guilds.cache.get(id);
        if (guild) guild.shard.send(payload)
    },
    plugins: [
    new Spotify({
      clientID,
      clientSecret
    }),
    new Apple()
  ]
})
var text = fs.readFileSync('./emojis.json')
var obj = JSON.parse(text)
bot.emoji = obj;

bot.embed = new discord.MessageEmbed()
config({
    path: __dirname + "/.env"
});

bot.on("ready", async () => {
    bot.user.setActivity(`Aqua Network`, { type: "WATCHING" })
    console.log("The bot is now online")
    bot.music.init(bot.user.id)
    bot.database.connect()
})

bot.database.on("ready", () => {
    console.log("Successfully connected to database")
})
bot.database.on("error", () => {
    console.log(`Couldn't connect to database`)
})
bot.on("raw", (d) => bot.music.updateVoiceState(d));

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.on("messageCreate", async (message) => {
    if (!message.guild) return;
    if (!message.author) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(bot.prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if (!command) {
        embed.setTitle("Command Error")
        embed.setDescription(`${bot.emoji.error} This command does not exist`)
        embed.setColor("RED")
        console.log(`User ${message.author.tag} tried to use a non existent command (${command})`)
        return message.reply({ embeds: [embed] })
    }
    if (command.ownerOnly) {
        if (!bot.devs.includes(message.author.id)) {
            embed.setTitle("Command Error")
            embed.setDescription(`${bot.emoji.error} You do not have permission to use this command.`)
            embed.setColor("RED")
            console.log(`User ${message.author.tag} tried to use a restricted command (${command})`)
            return message.reply({ embeds: [embed] })
        }
    }
    if (command) command.run(bot, message, args)
})

bot.music.on("nodeConnect", (node) => {
    console.log("Successfully connected to " + node.options.identifier)
});

bot.music.on("nodeDisconnect", (node) => {
    console.log("Unable to connect to " + node.options.identifier)
});

bot.music.on("nodeError", (node, error) => {
    console.log(`Lost connection of ${node.options.identifier}. Reason: ${error.message}`)
});

bot.music.on("trackStart", async(player, track) => {
    let channel = bot.channels.cache.get(player.textChannel);
    embed.setAuthor("Started Playing", "https://imgs.search.brave.com/J2j5NufZNBJIdmzIn3ZIc1_D47PhO7-nAStKMddnK9w/rs:fit:400:300:1/g:ce/aHR0cHM6Ly9tZWRp/YS5naXBoeS5jb20v/bWVkaWEvSHdqelRU/b2dLWUdJTS9naXBo/eS5naWY.gif")
    embed.setThumbnail(track.thumbnail)
    embed.setDescription(`**[${track.title}](${track.uri})**\n**Volume**: \`${player.volume}%\`\n**Filter**: \`none\``)
    embed.setFooter(`Requester: ${track.requester.tag}`, track.requester.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))
    embed.setColor("BLUE")
    let msg = await channel.send({ embeds: [embed] })
    if(track.isStream) return;
    setTimeout(() => {
        if(track.isSeekable) {
        return msg.delete()
        }
        }, track.duration)
});

bot.music.on("queueEnd", (player) => {
    player.destroy()
    let channel = bot.channels.cache.get(player.textChannel);
    let embed2 = new discord.MessageEmbed()
    .setTitle("Queue ended")
    .setDescription(`The music queue has ended.`)
    .setColor("BLUE")
    channel.send({ embeds: [embed2] })
});

bot.music.on("trackEnd", async(player) => {
    const autoplay = player.get("autoplay")
    if (autoplay === true) {
        const requester = player.get("requester");
        const oldidentifier = player.get("identifier");
        const identifier = player.queue.current.identifier;
        const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
        res = await player.search(search, requester);
		player.queue.add(res.tracks[2]);
    }

});

bot.login(process.env.TOKEN)