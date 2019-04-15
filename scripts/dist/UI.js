// TODO: Theres probably an updated version in EG
export class UITools {
    // Base
    Create(classes, id, elementName = 'div') {
        const element = document.createElement(elementName);
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
    CreateText(text, classes, id, elementName = 'p') {
        const element = this.Create(classes, id, elementName);
        element.innerText = text;
        return element;
    }
    CreateLink(text, path, classes, id) {
        const element = this.CreateText(text, classes, id, 'a');
        element.href = path;
        return element;
    }
    CreateImage(src, title, classes, id) {
        const element = this.Create(classes, id, 'img');
        element.src = src;
        element.alt = title;
        return element;
    }
    CreateSVG(src, title, classes, id, cacheIcon = false) {
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
    CreateList(items, classes, id, type = 'ul') {
        const element = this.Create(classes, id, type);
        items.forEach((item) => {
            element.appendChild(item);
        });
        return element;
    }
    CreateListItem(text, path, classes, id) {
        let element;
        if (path && path.length > 0) {
            element = this.Create(classes, id, 'li');
            const link = this.CreateLink(text, path);
            element.appendChild(link);
        }
        else {
            element = this.CreateText(text, classes, id, 'li');
        }
        return element;
    }
    // Form
    CreateLabel(text, classes, id) {
        const element = this.CreateText(text, classes, id, 'label');
        return element;
    }
    CreateInputText(label, name, type = 'text', required = false, value = '', placeholder = ' ', classes) {
        const input = this.CreateInput(name, type, required, value, placeholder, classes);
        label.appendChild(input);
        return label;
    }
    CreateForm(fields, action = window.location.href, method = 'POST', classes, id) {
        const submit = this.CreateInput(null, 'submit');
        submit.type = 'submit';
        fields.push(submit);
        const form = this.Wrap(fields, classes, id, 'form');
        form.action = action;
        form.method = method;
        return form;
    }
    CreateInput(name, type = 'text', required = false, value = '', placeholder = ' ', classes) {
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
    AddID(element, id) {
        element.id = id;
        return element;
    }
    AddClasses(element, classes) {
        classes.forEach((className) => {
            element.classList.add(className);
        });
        return element;
    }
    addHandler(element, handler, type = 'click') {
        element.addEventListener(type, handler);
        return element;
    }
    // Rendering
    // Render()
    Wrap(elements, classes = [], id = '', wrapperType = 'div') {
        const wrapper = this.Create(classes, id, wrapperType);
        elements.forEach((element) => {
            wrapper.appendChild(element);
        });
        return wrapper;
    }
}
