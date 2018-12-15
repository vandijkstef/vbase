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
    CreateInputText(label, type, name, value = '', placeholder = ' ', classes, required = false) {
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
}
