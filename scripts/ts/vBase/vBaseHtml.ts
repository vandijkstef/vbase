// vBase base HTML class
// Use when a certain module is created for a single DOM item that it needs to change/update

class VBaseHTML extends VBase {

	private DOM: HTMLElement;

	constructor(HTML: HTMLElement) {
		super();
		this.DOM = HTML;
	}

}
