class ContactForm extends Form {
	constructor(form) {
		super(form);
		this.Form = this;
	}

	protected Handle(this: Form, e: Event) {
		super.Handle(e);
		if (this.Form.GetValue('file')) {
			// TODO: Properly handle JS file uplaods, for now, we just use basic browser POST
			this.Form.DOM.submit();
			return;
		}
		const data = {
			email: this.Form.GetValue('email'),
			mailtosender: this.Form.GetValue('mailtosender'),
			message: this.Form.GetValue('message'),
			name: this.Form.GetValue('name'),
			securityToken: this.Form.GetValue('securityToken'),
		};
		this.Form.FormData = Object.assign(this.Form.FormData, data);
		this.API.post(this.Form.FormData, (formData: any) => {
			if (formData.status) {
				window[`Messenger`].Add(formData.success, 'success');
				this.Form.DOM.classList.add('hidden');
			} else {
				// TODO: Handle error
				// TODO: What happens if server can't be reached/there is no response?
			}
		});
	}
}
