const discord = require("discord.js")

module.exports.run = async(bot) => {
    bot.user.setActivity(`Advanced Bot`, { type: "WATCHING" })
    console.log(`Connected as ${bot.user.tag}`)
    bot.music.init(bot.user.id)
    bot.database.connect();
}