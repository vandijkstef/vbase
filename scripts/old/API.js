export default class API {
	constructor(url = '/api.php', ) {
		this.server = url; // TODO: Parse this based on the current page url // TODO: Hook this up to a setting to allow to other domains
		this.queryString = true;
	}

	call(data, callback) {
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

	get(data, callback) {
		const API = new XMLHttpRequest();
		API.open('GET', data);
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