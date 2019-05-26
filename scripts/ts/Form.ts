import { vBase } from './vbase/vBase.js';
import { API } from './API';

// General form class, to be extended
interface FormInput {
	DOM: HTMLInputElement;
	type: string;
	value: string;
}

export class Form extends vBase {

	submitBtn: HTMLInputElement;
	FormData: object;
	fields: FormInput[];
	Form: Form;
	API: API;
	DOM: HTMLFormElement;

	constructor(form) {
		super();
		this.DOM = form;
		this.DOM['Form'] = this;
		this.submitBtn = this.DOM.querySelector('[type=submit]');
		this.Refresh();
		this.FormData = {
			api: true
		};

		this.DOM.addEventListener('submit', this.Handle);
	}

	Fetch() {
		this.fields = [];
		const inputs = this.DOM.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement>;
		inputs.forEach((input) => {
			// TODO: Checkbox/Radio stuff
			if (input.type != 'submit') {
				this.fields[input.name] = {
					DOM: input,
					type: input.type,
					value: input.value
				};
			}
		});
	}

	Refresh() {
		if (!this.fields) {
			this.Fetch();
		}
		Object.keys(this.fields).forEach((fieldName) => {
			const field = this.fields[fieldName];
			field.value = field.DOM.value;
		});
	}

	GetValue(id) {
		try {
			return this.fields[id].value;
		} catch (err) {
			console.warn(err, id);
		}
	}

	Handle(e) {
		e.preventDefault();
		this.Form.Refresh();
		this.API = new API(this.DOM.action);
		this.Form.submitBtn.disabled = true;
	}
}