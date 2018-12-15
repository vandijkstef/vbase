import { vBase } from './vBase';

// vBase base HTML class
// Use when a certain module is created for a single DOM item that it needs to change/update

export class vBaseHTML extends vBase {
	
	DOM: HTMLElement;

	constructor(HTML: HTMLElement) {
		super();
		this.DOM = HTML;
	}
	
}