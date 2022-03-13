const axios = require('axios');
let base = 'https://nekos.life/api/v2/';

module.exports = {
	hentai() {
		return axios({
			url: base + 'img/Random_hentai_gif',
			headers: {
				accept: 'application/json',
				'User-Agent': ''
			},
		}).then(r => r.data).catch(e => {
			console.log(e.toJSON());
			return { url: null };
		});
	}
}