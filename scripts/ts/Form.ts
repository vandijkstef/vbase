// General form class, to be extended
interface IFormInput {
	DOM: HTMLInputElement;
	type: string;
	value: string;
}

class Form extends VBase {

	public API: API;
	public DOM: HTMLFormElement;
	public Form: Form;
	public FormData: object;

	protected submitBtn: HTMLInputElement;
	protected fields: IFormInput[];

	constructor(form) {
		super();
		this.DOM = form;
		this.DOM.form = this;
		this.submitBtn = this.DOM.querySelector('[type=submit]');
		this.Refresh();
		this.FormData = {
			api: true,
		};

		this.DOM.addEventListener('submit', this.Handle);
	}

	public GetValue(id) {
		try {
			return this.fields[id].value;
		} catch (err) {
			console.warn(err, id);
		}
	}

	protected Handle(e) {
		e.preventDefault();
		this.Form.Refresh();
		this.API = new API(this.DOM.action);
		this.Form.submitBtn.disabled = true;
	}

	private Refresh() {
		if (!this.fields) {
			this.Fetch();
		}
		Object.keys(this.fields).forEach((fieldName) => {
			const field = this.fields[fieldName];
			field.value = field.DOM.value;
		});
	}

	private Fetch() {
		this.fields = [];
		const inputs = this.DOM.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement>;
		inputs.forEach((input) => {
			// TODO: Checkbox/Radio stuff
			if (input.type !== 'submit') {
				this.fields[input.name] = {
					DOM: input,
					type: input.type,
					value: input.value,
				};
			}
		});
	}
}
