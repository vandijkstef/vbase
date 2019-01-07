class API extends VBase {

	private server: string;
	private queryString: boolean;

	constructor(api: string = '/api.php') {
		super();
		this.server = api;
		if (this.server !== '/api.php') {
			this.queryString = true;
		}
	}

	public post(data: object, callback: (data: object) => void) {
		const api = new XMLHttpRequest();
		api.open('POST', this.server);
		api.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		api.withCredentials = true;
		api.onload = () => {
			if (api.status === 200) {
				const jsonString = api.responseText.replace(/(\r\n|\n|\r)/gm, '');
				let json;
				try {
					json = JSON.parse(jsonString);
				} catch (err) {
					return callback({
						data: jsonString,
						err: 'No JSON',
					});
				}
				return callback(json);
			} else {
				console.warn('api error: ' + api.status);
			}
		};
		if (this.queryString) {
			const queryString = Object.keys(data).map((key) => key + '=' + data[key]).join('&');
			api.send(queryString);
		} else {
			api.send(JSON.stringify(data));
		}
	}

	public get(data: object, callback: (data: object) => void) {
		const api = new XMLHttpRequest();
		api.open('GET', this.server); // TODO: Stringify object data into URL
		api.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		api.onload = () => {
			if (api.status === 200) {
				let json;
				try {
					json = JSON.parse(api.responseText.replace('?(', '').replace(');', ''));
				} catch (err) {
					return callback({
						data: api.responseText,
						err: 'No JSON',
					});
				}
				return callback(json);
			} else {
				console.warn('api error: ' + api.status);
			}
		};
		api.send(JSON.stringify(data));
	}
}
