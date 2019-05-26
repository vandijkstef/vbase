import { Form } from './Form.js';

export class ContactForm extends Form {
	constructor(form) {
		super(form);
	}

	Handle(e) {
		super.Handle(e);
		const data = {
			name: this.Form.GetValue('name'),
			email: this.Form.GetValue('email'),
			message: this.Form.GetValue('message'),
		};
		this.Form.FormData = Object.assign(this.Form.FormData, data);
		this.API.post(this.Form.FormData, (data) => {
			// Handle
		});
	}
}