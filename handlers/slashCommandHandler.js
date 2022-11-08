module.exports = {
	async handle(bot) {
		let guilds = bot.guilds.cache
			// .filter(g => g.id === "856243057308598302")
			// "856243057308598302" - test server (Bot Maintenence)
		bot.slashCommands.forEach(command => {
			let permissions = [];
			let data = {
				name: command.name,
				description: command.description,
				category: command.category,
			    ownerOnly: command.ownerOnly,
				nsfwOnly: command.nsfwOnly,
				options: command.options
			}
			if(command.ownerOnly) {
				data.default_permission = false;
			}
			guilds.forEach(async guild => {
				let cmd = await guild.commands.create(data);
				if(data.default_permission) {
					guild.commands.permissions.set({
						command: cmd.id,
						permissions: bot.devs.map(a => {
							return {
								id: a,
								type: 'USER',
								permission: true
							}
						})
					});
				};
			})
		})
	}
}