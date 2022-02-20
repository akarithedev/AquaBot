
var http = require('http');

http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);


const discord = require("discord.js");
require("discord-reply");
const bot = new discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], ws: {intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES', 'GUILD_PRESENCES', 'GUILD_INTEGRATIONS'], properties: { $browser: "Discord Android"}}}) 
const fs = require("fs")
const { token, prefix, owner } = require("./config.json")
const Util  = require("./AquaUtil.js")
const { Manager } = require("erela.js")
const { nodes } = require("./config.json")
const embed = new discord.MessageEmbed()
const { Database } = require("quickmongo")
const fetch = require("node-fetch")
const { config } = require("dotenv")
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
    send(id, payload) {
        const guild = bot.guilds.cache.get(id);
        if(guild) guild.shard.send(payload)
    }
})

config({
    path: __dirname + "/.env"
});

bot.on("ready", async() => {
    bot.user.setActivity(`Aqua Network`, { type: "WATCHING"})
    console.log("The bot is now online")
    bot.music.init(bot.user.id)
})

bot.database.on("ready", () => {
    console.log("Successfully connected to database")
})
bot.on("raw", (d) => bot.music.updateVoiceState(d));

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.on("message", async(message) => {
    if(!message.guild) return;
    if(!message.author) return;
    if(message.author.bot) return;
    if(!message.content.startsWith(bot.prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
  
    const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    
    if(!command) return;
if(command.ownerOnly) {
    if(!bot.devs.includes(message.author.id)) {
        return message.lineReply("You are not my developer!")
    }
}
 if(command) command.run(bot, message, args)
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

bot.music.on("trackStart", (player, track) => {
    let channel = bot.channels.cache.get(player.textChannel);
   embed.setDescription(`**Now playing**: \`${track.title}\``)
   embed.setColor("BLUE")
   channel.send(embed)
});

bot.music.on("queueEnd", (player) => {
    player.destroy()
let channel = bot.channels.cache.get(player.textChannel);
embed.setDescription(`The music queue has ended.`)
embed.setColor("BLUE")
channel.send(embed)

})

bot.login(process.env.TOKEN)