const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

module.exports = class Util {
	constructor(bot) {
		this.bot = bot;
	}

	isClass(input) {
		return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split('_').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}
	
	checkOwner(target) {
		return this.bot.devs.includes(target);
	}

	comparePerms(member, target) {
		return member.roles.highest.position < target.roles.highest.position;
	}

	formatPerms(perm) {
		return perm
				.toLowerCase()
				.replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
				.replace(/_/g, ' ')
				.replace(/Guild/g, 'Server')
				.replace(/Use Vad/g, 'Use Voice Acitvity');
	}

	formatArray(array, type = 'conjunction') {
		return new Intl.ListFormat('en-GB', { style: 'short', type: type }).format(array);
	}
    async haste(text) {
     const req = await this.bot.snek.post("https://haste.ntmnathan.com/documents", { text });
     return `\`\`\`https://haste.ntmnathan.com/${req.data.key}\`\`\``   
   }
   get paginationEmojis() {
	return ["◀", "⛔", "▶"];
}

async pagination(msg, author, contents, init = true, currPage = 0) {
	if (init) for (const emoji of this.paginationEmojis) await msg.react(emoji);

	const collector = msg.createReactionCollector((reaction, user) => {
		return this.paginationEmojis.includes(reaction.emoji.name) && user.id === author.id;
	}, {
		max: 1,
		time: 30000
	});

	collector
		.on("collect", (reaction) => {
			reaction.users.remove(author);

			const emoji = reaction.emoji.name;
			if (emoji === this.paginationEmojis[0]) currPage--;
			if (emoji === this.paginationEmojis[1]) return collector.stop();
			if (emoji === this.paginationEmojis[2]) currPage++;
			currPage = ((currPage % contents.length) + contents.length) % contents.length;

			const embed = msg.embeds[0]
				.setDescription(contents[currPage])
				.setFooter(`Page ${currPage + 1} of ${contents.length}.`);

			msg.edit(embed);

			this.pagination(msg, author, contents, false, currPage);
		})
		.on("end", (_, reason) => {
			if (["time", "user"].includes(reason)) msg.reactions.removeAll();
		});
}
chunk(arr, size) {
	const temp = [];
	for (let i = 0; i < arr.length; i += size) {
		temp.push(arr.slice(i, i + size));
	}
	return temp;
}
};