import { vBase } from './vBase/vBase.js';

export class API extends vBase {

	server: string;
	queryString: boolean;

	constructor(API: string = '/api.php') {
		super();
		this.server = API;
		if (this.server !== '/api.php') {
			this.queryString = true;
		}
	}

	post(data: object, callback: Function) {
		const API = new XMLHttpRequest();
		API.open('POST', this.server);
		API.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		API.withCredentials = true;
		API.onload = function () {
			if (API.status === 200) {
				let json = API.responseText.replace(/(\r\n|\n|\r)/gm, '');
				try {
					json = JSON.parse(json);
				} catch (err) {
					return callback({
						err: 'No JSON',
						data: json
					});
				}
				return callback(json);
			} else {
				console.warn('API error: ' + API.status);
			}
		};
		if (this.queryString) {
			const queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
			API.send(queryString);
		} else {
			API.send(JSON.stringify(data));
		}
	}

	get(data: object, callback: Function) {
		const API = new XMLHttpRequest();
		API.open('GET', this.server); // TODO: Stringify object data into URL
		API.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		API.onload = function () {
			if (API.status === 200) {
				let json;
				try {
					json = JSON.parse(API.responseText.replace('?(', '').replace(');', ''));
				} catch (err) {
					return callback({
						err: 'No JSON',
						data: API.responseText
					});
				}
				return callback(json);
			} else {
				console.warn('API error: ' + API.status);
			}
		};
		API.send(JSON.stringify(data));
	}
}