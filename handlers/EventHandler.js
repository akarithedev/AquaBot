const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Create a new Ascii table

let table = new ascii("");
table.setHeading("Event", "Status");

module.exports = (bot) => {

  const events = readdirSync(`./events/discord/`).filter(file => file.endsWith(".js"));

  for (let file of events) {

    try {
    let pull = require(`../events/discord/${file}`);

    if (pull.event) {
      table.addRow(file, `❌ -> Property event should be string.`);
      continue;
    }

    pull.event = pull.event || file.replace(".js", "")
    bot.events.set(pull.event, pull)
    bot.on(pull.event, pull.run.bind(null, bot))
    
    table.addRow(file, '✅ | Loaded');

    } catch(err) {

  console.log("Something went wrong while loading event")
  console.log(err)
  table.addRow(file, `❌ | Not loaded`);
    }
  }

   console.log(table.toString());
}