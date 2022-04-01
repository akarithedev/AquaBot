const discord = require("discord.js")

module.exports = {
    name: "google",
    description: "a normal misc command for bored moments",
    category: "misc",
    ownerOnly: false,
    nsfwOnly: false,
    options: [{
        name: "url",
        description: "site url. Do not use https://",
        type: "STRING",
        required: true
    }],
    run: async(bot, interaction, args) => {
        try {
            const puppeteer = require("puppeteer")
            const browser = await puppeteer.launch({args:["--no-sandbox"]})
            await interaction.deferReply();
            await interaction.editReply("Taking screenshot...");

                const page = await browser.newPage();
                await page.setViewport({width: 1920, height: 1080});
                await page.goto(`https://${args.getString("url")}`)
              setTimeout(async() => {
            var screenshot = await page.screenshot({type: 'png'}); 
              
              await interaction.editReply({files:[{ attachment: screenshot, name: "screenshot.png"}]})
              await browser.close();
              }, 5000)
            } catch(err) {
              return interaction.reply(`An error occured: \`${err}\``)
            }
    }
}