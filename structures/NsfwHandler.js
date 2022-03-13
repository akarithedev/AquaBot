const axios = require('axios');
let base = 'http://164.132.158.16:30028/?type=';

module.exports = {
	async hentai() {
		return await this.request('randomHentaiGif');
	},
	async pussy() {
		return await this.request('pussy');
	},
	async nekoGif() {
		return await this.request('nsfw_neko_gif');
	},
	async neko() {
		return await this.request('lewd');
	},
	async lesbian() {
		return await this.request('les');
	},
	async kuni() {
		return await this.request('kuni');
	},
	async cumsluts() {
		return await this.request('cum');
	},
	async classic() {
		return await this.request('classic');
	},
	async boobs() {
		return await this.request('boobs');
	},
	async blowjob() {
		return await this.request('bJ');
	},
	async yuri() {
		return await this.request('yuri');
	},
	async tits() {
		return await this.request('tits');
	},
	async solo() {
		return await this.request('solog');
	},
	async feet() {
		return await this.request('feetg');
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