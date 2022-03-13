var http = require('http');

http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen();

const discord = require("discord.js");
const bot = new discord.Client({ intents: 32767, ws: { properties: { $browser: "Discord Android" } }});
const fs = require("fs");
const { prefix, owner } = require("./config.json");
const Util = require("./AquaUtil.js");
const { Manager } = require("erela.js");
const { nodes } = require("./config.json");
const { Database } = require("quickmongo");
const { config } = require("dotenv");
const Spotify = require("erela.js-spotify");
const Apple = require("erela.js-apple");
const Deezer = require("erela.js-deezer");
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
bot.database = new Database(`mongodb://admin:${encodeURIComponent("aP@55word")}@ca1.node.sneakyhub.com:30037/aqua?authSource=admin`);
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
    new Apple(),
    new Deezer()
  ]
})
var text = fs.readFileSync('./emojis.json')
var obj = JSON.parse(text)
bot.emoji = obj;
bot.events = new discord.Collection();

bot.embed = new discord.MessageEmbed()
config({
    path: __dirname + "/.env"
});

bot.on("ready", async () => {
    bot.user.setActivity(`Advanced Bot`, { type: "WATCHING" })
    console.log(`Connected as ${bot.user.tag}`)
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

["command", "event"].forEach(handler => {
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
        const embed = new discord.MessageEmbed()
        .setTitle("Command Error")
        .setDescription(`${bot.emoji.error} This command does not exist`)
        .setColor("RED")
        console.log(`User ${message.author.tag} tried to use a non existent command (${command})`)
        return message.reply({ embeds: [embed] })
    }
    if (command.ownerOnly) {
        if (!bot.devs.includes(message.author.id)) {
            const embed2 = new discord.MessageEmbed()
            .setTitle("Command Error")
            .setDescription(`${bot.emoji.error} You do not have permission to use this command.`)
            .setColor("RED")
            console.log(`User ${message.author.tag} tried to use a restricted command (${command})`)
            return message.reply({ embeds: [embed2] })
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
    let filters = await bot.database.get(`filters_${player.guild}`);

    const embed3 = new discord.MessageEmbed()
    .setAuthor("Started Playing", "https://imgs.search.brave.com/oyv9NvW9g1RvUWiERhs3gpdQ4vo-tiqoXppHuAkDBIU/rs:fit:700:700:1/g:ce/aHR0cHM6Ly9tZWRp/YTAuZ2lwaHkuY29t/L21lZGlhL1NTOHph/TkZJYnd5amNQZGg4/VS9zb3VyY2UuZ2lm.gif")
    .setThumbnail(track.thumbnail)
    .setDescription(`**[${track.title}](${track.uri})**\n**Volume**: \`${player.volume}%\`\n**Filter(s)**: \`${filters.length !== 0 ? filters.join(', ') : 'None'}\``)
    .setFooter(`Requester: ${track.requester.tag}`, track.requester.displayAvatarURL({ size: 4096, format: "png", dynamic: true }))
    .setColor("BLUE")
    let msg = await channel.send({ embeds: [embed3] })
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
    let embed4 = new discord.MessageEmbed()
    .setTitle("Queue ended")
    .setDescription(`The music queue has ended.`)
    .setColor("BLUE")
    channel.send({ embeds: [embed4] })
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