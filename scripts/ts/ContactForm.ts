import { Form } from './Form';

export class ContactForm extends Form {
	constructor(form) {
		super(form);
	}

	Handle(e) {
		super.Handle(e);
		if (this.Form.GetValue('file')) {
			// TODO: Properly handle JS file uplaods, for now, we just use basic browser POST
			this.Form.DOM.submit();
			return;
		}
		const data = {
			name: this.Form.GetValue('name'),
			email: this.Form.GetValue('email'),
			message: this.Form.GetValue('message'),
			securityToken: this.Form.GetValue('securityToken'),
			mailtosender: this.Form.GetValue('mailtosender'),
		};
		this.Form.FormData = Object.assign(this.Form.FormData, data);
		this.API.post(this.Form.FormData, (data) => {
			if (data.status) {
				window['Messenger'].Add(data.success, 'success');
				this.Form.DOM.classList.add('hidden');
			} else {
				// TODO: Handle error
				// TODO: What happens if server can't be reached/there is no response?
			}
		});
	}
}