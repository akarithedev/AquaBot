const express = require("express")
const app = new express();

app.listen(3340, () => {
  console.log("App is listening on port 3340")
});

app.get("/", (req, res) => {
  res.status(200).send("click on this link to see how i made the bot: https://www.youtube.com/watch?v=dQw4w9WgXcQ")
})

const discord = require("discord.js");
const bot = new discord.Client({ intents: 32767});
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
const ascii = require("ascii-table");
require("./structures/MusicPlayer");

bot.commands = new discord.Collection();
bot.slashCommands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.categories = fs.readdirSync("./commands")
bot.slashCategories = fs.readdirSync("./slashCommands")
bot.prefix = prefix;
bot.devs = owner;
bot.utils = new Util(bot);
bot.snek = require("axios");
bot.database = new Database("mongodb+srv://aqua:adelanreade889@aqua.43iyquf.mongodb.net/aquadb");
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
});
bot.events = new discord.Collection();
bot.embed = new discord.MessageEmbed();
var text = fs.readFileSync('./emojis.json');
var obj = JSON.parse(text);
bot.emoji = obj;

config({
    path: __dirname + "/.env"
});

bot.database.on("ready", () => {
     console.log("Successfully connected to database")
});
bot.database.on("error", () => {
    console.log(`Couldn't connect to database`)
});
bot.on("raw", (d) => bot.music.updateVoiceState(d));

["CommandHandler", "EventHandler"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

fs.readdir('./events/lavalink/', (err, files) => {
    if (err) return console.error(err);
  
   files.forEach(file => {
        const event = require(`./events/lavalink/${file}`);
        let eventName = file.split(".")[0];
        bot.music.on(eventName, event.bind(null, bot));
     console.log(`${eventName} ✅ | Loaded`)
    });
  
  });

bot.login(process.env.TOKEN)