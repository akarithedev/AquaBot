const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Create a new Ascii table

let table = new ascii("");
table.setHeading("Event", "Status");

module.exports = (client) => {

  const events = readdirSync(`./events/`).filter(file => file.endsWith(".js"));

  for (let file of events) {

    try {
    let pull = require(`../events/${file}`);

    if (pull.event) {
      table.addRow(file, `❌ -> Property event should be string.`);
      continue;
    }

    pull.event = pull.event || file.replace(".js", "")
    client.events.set(pull.event, pull)
    client.on(pull.event, pull.run.bind(null, client))
    
    table.addRow(file, '✅ | Loaded');

    } catch(err) {

  console.log("Something went wrong while loading event")
  console.log(err)
  table.addRow(file, `❌ | Not loaded`);
    }
  }

   console.log(table.toString());
}