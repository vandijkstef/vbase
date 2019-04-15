import { vBaseHTML } from './vbase/vBaseHTML';

export class Countdown extends vBaseHTML {
	
	time: number;
	date: Date;
	formatted: string;


	constructor(timer) {
		super(timer);
		// this.DOM = timer;
		this.time = this.ParseTimeText(this.DOM.innerText);
		this.Format();
		this.Step();
	}

	ParseTimeText(text) {
		text = text.split(':');
		let total = parseInt(text[2]);
		total += parseInt(text[1]) * 60;
		total += parseInt(text[0]) * 60 * 60;
		return total;
	}

	Format() {
		this.date = new Date(null);
		this.date.setSeconds(this.time);
		this.formatted = this.date.toISOString().substr(11, 8);
		return this.formatted;
	}

	Step() {
		this.time--;
		this.DOM.innerText = this.Format();
		setTimeout(() => {
			this.Step();
		}, 1000);
	}
}