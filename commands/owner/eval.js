const { MessageEmbed } = require("discord.js")
const { inspect } = require("util")
const beautify = require("beautify")
module.exports = {
    name: "eval",
    description: "Evaluates a javascript value",
    aliases: ["jev"],
    category: "owner",
    ownerOnly: true,
    run: async(bot, message, query, data) => {
        let msg = message;
const { args, flags } = parseQuery(query);
        
    try {
      if (!args.length) {
          let embed = new MessageEmbed()
          .setDescription("Please provide a value to evaluate")
          .setColor("BLUE")
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
          return message.lineReply(embed)
      }
      let code = args.join(" ");
      let depth = 0;
      if (flags.includes("async")) {
        code = `(async() => { ${code} })()`;
      }
      if (flags.some(x => x.includes("depth"))) {
          depth = flags.find(x => x.includes("depth")).split("=")[1];
          depth = parseInt(depth, 10);
      }

      let { evaled, type } = await parseEval(eval(code)); /* eslint-disable-line */
        if (flags.includes("silent")) return;
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
        evaled = evaled
        .replace(bot.token, 'kek')
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`);
        if (evaled.length >= 1024) evaled = await bot.utils.haste(evaled);
        else evaled = `\`\`\`js\n${evaled}\`\`\``;
        const embed = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(`**Input**\n\`\`\`js\n${args.join(" ")}\`\`\``)
          .addField('Output', evaled)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
          await msg.lineReply(embed);
     
       } catch (e) {
       let error;
       if(e.length >= 1024) error = await bot.utils.haste(e);
       else error = `\`\`\`${e}\`\`\``;
       const embed = new MessageEmbed()
        .setAuthor("ERROR")
        .setDescription(error)
        .setColor("BLUE")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        await msg.lineReply(embed);
    }

      async function parseEval(input) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`
    };
  }
  return {
    evaled: input,
    type: parseType(input)
  };
}
    function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries) {
  const args = [];
  const flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
    else args.push(query);
  }
  return { args, flags };
}
    }

}