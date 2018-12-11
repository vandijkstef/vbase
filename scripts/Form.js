class Form {
	constructor(form) {
		this.DOM = form;
		this.DOM.Form = this;
		this.submitBtn = this.DOM.querySelector('[type=submit]');
		this.Refresh();
		this.FormData = {
			api: true
		};

		this.DOM.addEventListener('submit', this.Handle);
	}

	Fetch() {
		this.fields = {};
		const inputs = this.DOM.querySelectorAll('input, textarea');
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
		Object.keys(this.fields).forEach((field) => {
			field = this.fields[field];
			field.value = field.DOM.value;
		});
	}

	GetValue(id) {
		return this.fields[id].value;
	}

	Handle(e) {
		e.preventDefault();
		this.Form.Refresh();
		this.API = new API(this.action);
		this.Form.submitBtn.disabled = true;
	}
}