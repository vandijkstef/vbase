class RadioDiv {
	constructor(input, group) {
		// Set variables
		this.input = input;
		this.div = input.parentElement;
		this.group = group;

		// Put this class on the element for easy access
		this.input.radiodiv = this;
		this.div.radiodiv = this;

		this.input.classList.add('visuallyhidden');
		this.div.classList.add('js');

		// Set the radiodiv if the input is already checked
		if (input.checked) {
			this.Set();
		}

		this.div.addEventListener('click', this.HandleClick);
		this.input.addEventListener('change', this.Handle);
	}

	Handle(e) {
		const radiodiv = e.target.radiodiv;
		radiodiv.Set();
	}

	HandleClick(e) {
		const radiodiv = e.target.radiodiv;
		if (radiodiv) {
			radiodiv.input.checked = true;
			radiodiv.Set();
		}
	}

	Set() {
		if (this.group.length) {
			this.group.forEach((item) => {
				if (item.radiodiv) {
					item.radiodiv.div.classList.remove('selected');
				}
			});
		}
		this.div.classList.add('selected');
		if (document.body.id === 'checkout_easy') {
			new tempTotals();
		}
	}

	TestGroup() {
		if (this.group.length) {
			this.group.forEach((item) => {
				console.log(item);
			});
		}
	}

}