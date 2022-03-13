const axios = require('axios');
let base = 'http://nekos.life/api/v2/';

module.exports = {
	hentai() {
		return axios({
			url: base + 'img/Random_hentai_gif',
			headers: {
				accept: 'application/json',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39'
			},
		}).then(r => r.data).catch(e => {
			console.log(e.toJSON());
			return { url: null };
		});
	}
}