// TODO: Theres probably an updated version in EG
export class UITools {
	// Base
	Create(classes?: Array<string>, id?: string, elementName: string = 'div') {
		const element: any = document.createElement(elementName);
		if (id) {
			this.AddID(element, id);
		}
		if (classes) {
			this.AddClasses(element, classes);
		}
		return element;
	}

	// Creators
	// Base
	CreateText(text: string, classes?: Array<string>, id?: string, elementName: string = 'p') {
		const element: any = this.Create(classes, id, elementName);
		element.innerText = text;
		return element;
	}

	CreateLink(text: string, path: string, classes?: Array<string>, id?: string) {
		const element: HTMLAnchorElement = this.CreateText(text, classes, id, 'a');
		element.href = path;
		return element;
	}

	CreateImage(src: string, title: string, classes?: Array<string>, id?: string) {
		const element: HTMLImageElement = this.Create(classes, id, 'img');
		element.src = src;
		element.alt = title;
		return element;
	}

	CreateSVG(src: string, title: string, classes: Array<string>, id: string, cacheIcon: boolean = false) {
		// TODO: Rework so it can function without API, unless required. Maybe use export class constructor for this?
		// const element = this.Create(classes, id, 'div');
		// const iconCache = localStorage.getItem(src);
		// if (!iconCache) {
		// 	const api = new XMLHttpRequest();
		// 	api.open('GET', src, true);
		// 	api.onload = () => {
		// 		if (cacheIcon) {
		// 			localStorage.setItem(src, api.responseText);
		// 		}
		// 		element.innerHTML = api.responseText;
		// 	};
		// 	api.send();
		// } else {
		// 	element.innerHTML = iconCache;
		// }
		// return element;
	}

	CreateList(items: Array<HTMLLIElement>, classes: Array<string>, id: string, type: string = 'ul') {
		const element: HTMLElement = this.Create(classes, id, type);
		items.forEach((item) => {
			element.appendChild(item);
		});
		return element;
	}

	CreateListItem(text: string, path?: string, classes?: Array<string>, id?: string) {
		let element: HTMLElement;
		if (path && path.length > 0) {
			element = this.Create(classes, id, 'li');
			const link = this.CreateLink(text, path);
			element.appendChild(link);
		} else {
			element = this.CreateText(text, classes, id, 'li');
		}
		return element;
	}

	// Form
	CreateLabel(text: string, classes: Array<string>, id: string) {
		const element: HTMLLabelElement = this.CreateText(text, classes, id, 'label');
		return element;
	}

	CreateInputText(label: HTMLLabelElement, name: string, type: string = 'text', required: boolean = false, value: string = '', placeholder: string = ' ', classes?: Array<string>) {
		const input = this.CreateInput(name, type, required, value, placeholder, classes);
		label.appendChild(input);
		return label;
	}

	CreateForm(fields: Array<HTMLLabelElement>, action: string = window.location.href, method: string = 'POST', classes?: Array<string>, id?: string) {
		const submit = this.CreateInput(null, 'submit');
		submit.type = 'submit';
		fields.push(submit);

		const form = this.Wrap(fields, classes, id, 'form');
		form.action = action;
		form.method = method;

		return form
	}

	CreateInput(name: string, type: string = 'text', required: boolean = false, value: string = '', placeholder: string = ' ', classes?: Array<string>) {
		const input = this.Create(classes, name, 'input');
		input.type = type;
		if (type === 'submit') {
			return input;
		}
		input.name = name;
		input.value = value;
		if (type === 'hidden') {
			return input;
		}
		input.required = required;
		input.placeholder = placeholder;
		return input;
	}


	// CreateInputSet()

	// CreateInputRadio()

	// CreateInputCheckbox()

	// CreateInputSelect()
	// CreateSelectOption()

	// CreateForm()

	// CreateAudio()

	// Decorators
	AddID(element: HTMLElement, id: string) {
		element.id = id;
		return element;
	}

	AddClasses(element: HTMLElement, classes: Array<string>) {
		classes.forEach((className) => {
			element.classList.add(className);
		});
		return element;
	}

	addHandler(element: HTMLElement, handler: EventListener, type: string = 'click') {
		element.addEventListener(type, handler);
		return element;
	}

	// Rendering

	// Render()
	Wrap(elements: Array<HTMLElement>, classes: Array<string> = [], id: string = '', wrapperType: string = 'div') {
		const wrapper = this.Create(classes, id, wrapperType);
		elements.forEach((element) => {
			wrapper.appendChild(element);
		});
		return wrapper;
	}

	// WrapRender()
}