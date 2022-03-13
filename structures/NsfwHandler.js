const axios = require('axios');
let base = 'https://?type=';

module.exports = {
	hentai() {
		return axios({
			url: base + 'randomHentaigif',
		}).then(r => {
			console.log(r.data);
			return r.data;
		}).catch(e => {
			console.log(e);
			return { url: null };
		});
	}
}