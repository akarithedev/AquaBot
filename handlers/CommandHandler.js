const { readdirSync } = require("fs");

const ascii = require("ascii-table");

module.exports = (bot, slash = false) => { //am inteles
	if(!slash) {
		let table = new ascii("");
		table.setHeading("Command", "Status");
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                bot.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
        }
    });
    // Log the table
    console.log(table.toString());
	} else {
		
		let table = new ascii("");
		table.setHeading("Slash Command", "Status");
    readdirSync("./slashCommands/").forEach(dir => {
        const commands = readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../slashCommands/${dir}/${file}`);
    
            if (pull.name) {
                bot.slashCommands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
        }
    });
    console.log(table.toString());
	}
}