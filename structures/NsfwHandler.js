const axios = require('axios');
let base = 'http://164.132.158.16:30028/?type=';

module.exports = {
	async hentai() {
		return await this.request('randomHentaiGif');
	},
	async pussy() {
		return await this.request('pussy');
	},
	async neko() {
		return await this.request('nekoGif');	
	},
	async lesbian() {
		return await this.request('lesbian');
	},
	async kuni() {
		return await this.request('kuni');
	},
	async cumsluts() {
		return await this.request('cumsluts');
	},
	async classic() {
		return await this.request('classic');
	},
	async boobs() {
		return await this.request('boobs');
	},
	async blowjob() {
		return await this.request('blowJob');
	},
	async yuri() {
		return await this.request('yuri');
	},
	async tits() {
		return await this.request('tits');
	},
	async solo() {
		return await this.request('girlSoloGif');
	},
	async feet() {
		return await this.request('feetGif');
	},
	async request(type) {
		return await axios({
			url: base + type,
		}).then(r => {
			return r.data.url;
		}).catch(e => {
			console.log(e.isAxiosError ? e.toJSON() : e);
			return { url: null };
		});
	}
}