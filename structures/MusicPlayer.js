const { Structure } = require('erela.js');

module.exports = Structure.extend('Player', Player => {
	class MusicPlayer extends Player {
		constructor(...args) {
			super(...args);
			this.speed = 1;
			this.pitch = 1;
			this.rate = 1;
      this._8d = false;
			this._nightcore = false;
			this._vaporwave = false;
			this._bassboost = false;
			this._distortion = false;
		    this._vibrato = false;
		  
		}

        set8D(value) {
            if(typeof value !== "boolean") {throw new RangeError(`[ set8D Function Error ]: Please provide a valid value (true/false).`);}
    
            this._8d = value;
    
            if(this._8d) {
                this.node.send({
                    op: "filters",
                    guildId: this.guild,
                    rotation: {
                        rotationHz: 0.2
                    }
                });
            } else {
                this.node.send({
                    op: "filters",
                    guildId: this.guild,
                    rotation: {
                       rotationHz: 0.0 
                    }
                });
            };
    
            return this;
        };
		setSpeed(speed) {
			if (isNaN(speed)) {throw new RangeError('Player#setSpeed() Speed must be a number.');}
			this.speed = Math.max(Math.min(speed, 5), 0.05);
			this.setTimescale(speed);
			return this;
		}
		setPitch(pitch) {
			if (isNaN(pitch)) {throw new RangeError('Player#setPitch() Pitch must be a number.');}
			this.pitch = Math.max(Math.min(pitch, 5), 0.05);
			this.setTimescale(this.speed, pitch);
			return this;
		}

		setNightcore(value) {
			if (typeof value !== 'boolean') {throw new RangeError('Player#setNighcore() Nightcore can only be "true" or "false".');}

			this._nightcore = value;
			if(this._nighcore) {
				this._bassboost = false;
				this._distortion = false;
				this._vaporwave = false;
				this._vibrato = false;
				this.setVibrato(false)
				this.setVaporwave(false);
				this.setBassboost(false);
				this.setDistortion(false);
				this.setTimescale(1.2999999523162842, 1.2999999523162842, 1);
			} else {
				this.setTimescale(1, 1, 1);
				this.clearEffects();
			}
			return this;
		}
		setVibrato(value) {
			if (typeof value !== 'boolean') {throw new RangeError('Player#setVibrato() Vibrato can only be "true" or "false".');}

			this._vibrato = value;

			if(this._vibrato) {
				this._nightcore = false;
				this._bassboost = false;
				this._distortion = false;
				this._vaporwave = false;
				this.setBassboost(false);
				this.setNightcore(false);
				this.setVaporwave(false);
				this.setDistortion(false);
				this.node.send({
                    op: "filters",
                    guildId: this.guild,
					vibrato: {
						frequency: 10,
						depth: 0.9
					}
			})

		} else {

			this.clearEffects()
		}
		return this;
	}
		setVaporwave(value) {
			if (typeof value !== 'boolean') {throw new RangeError('Player#setVaporwave() Vaporwave can only be "true" or "false".');}

			this._vaporwave = value;
			if(this._vaporwave) {
				this._nightcore = false;
				this._bassboost = false;
				this._distortion = false;
				this._vibrato = false;
				this.setBassboost(false);
				this.setNightcore(false);
				this.setDistortion(false);
				this.setVibrato(false);
				this.setTimescale(0.8500000238418579, 0.800000011920929, 1);
			} else {
				this.setTimescale(1, 1, 1);
			}
			return this;
		}

		setDistortion(value) {
			if (typeof value !== 'boolean') {throw new RangeError('Player#setDistortion() Distortion can only be "true" or "false"');}

			this._distortion = value;
			if(this._distortion) {
				this._nightcore = false;
				this._vaporwave = false;
				this._bassboost = false;
				this._vibrato = false;
				this.setBassboost(false);
				this.setNightcore(false);
				this.setVaporwave(false);
				this.setVibrato(false);
				this.setDistort(0.5);
			} else {
				this.clearEffects();
			}
			return this;
		}

		setBassboost(value) {
			if (typeof value !== 'boolean') {throw new RangeError('Player#setBassboost() Bassboost can only be "true" or "false".');}

			this._bassboost = value;
			if(this._bassboost) {
				this._nightcore = false;
				this._vaporwave = false;
				this._vibrato = false;
				this.setVaporwave(false);
				this.setNightcore(false);
				this.setVibrato(false);
				this.setEqualizer(1, 0.85);
			} else {
				this.clearEffects();
			}
			return this;
		}

		setDistort(value) {
			this._distortion = value || this._distortion;

			this.node.send({
				op: 'filters',
				guildId: this.guild,
				distortion: {
					distortion: this.value,
				},
			});
			return this;
		}

		setEqualizer(band, gain) {
			this.band = band || this.band;
			this.gain = gain || this.gain;

			this.node.send({
				op: 'filters',
				guildId: this.guild,
				equalizer: [
					{
						band: this.band,
						gain: this.gain,
					},
					{
						band: this.band,
						gain: this.gain,
					},
					{
						band: this.band,
						gain: this.gain,
					},
					{
						band: this.band,
						gain: this.gain,
					},
					{
						band: this.band,
						gain: this.gain,
					},
					{
						band: this.band,
						gain: this.gain,
					},
				],
			});
			return this;
		}

		setTimescale(speed, pitch, rate) {
			this.speed = speed || this.speed;
			this.pitch = pitch || this.pitch;
			this.rate = rate || this.rate;

			this.node.send({
				op: 'filters',
				guildId: this.guild,
				timescale: {
					speed: this.speed,
					pitch: this.pitch,
					rate: this.rate,
				},
			});
			return this;
		}
		clearEffects() {
			this.speed = 1;
			this.pitch = 1;
			this.rate = 1;
			this._bassboost = false;
			this._nightcore = false;
			this._vaporwave = false;
			this._distortion = false;
			this._vibrato = false;
			this._8d = false;
			this.clearEQ();

			this.node.send({
				op: 'filters',
				guildId: this.guild,
			});
			return this;
		}
	}
	return MusicPlayer;
});