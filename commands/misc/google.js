const discord = require("discord.js")

module.exports = {
    name: "google",
    description: "a normal misc command for bored moments",
    category: "misc",
    ownerOnly: false,
    run: async(bot, message, args) => {
        let embed = new discord.MessageEmbed()
        
        embed.setDescription("This command is disabled at the moment.")
        embed.setColor("RED")
        embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        message.reply({embeds: [embed]})
        
        if(!args.length) {
            embed.setDescription("Please provide an url to catch screenshot of")
            embed.setColor("RED")
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
            return message.reply({embeds: [embed]})
        }

        try {
            const puppeteer = require("puppeteer")
            const browser = await puppeteer.launch({args:["--no-sandbox"]})
            const page = await browser.newPage()
            await page.setViewport({width: 1920, height: 1080});
              await page.goto(`https://${args.join(" ")}`) 
            var screenshot = await page.screenshot({type: 'png'}); 
              
                message.reply({files:[{ attachment: screenshot, name: "screenshot.png"}]})
              await browser.close();
            } catch(err) {
              console.error(err)
              message.channel.send(`An error occured: \`${err}\``)
            }
    }
}