export default class vBase {
	constructor(options) {
		window.v = this;
		this.verbose = options.verbose || false;

		options.modules.forEach(async (mod) => {
			await import(`./${mod}.js`)
				.then((module) => {
					v[mod] = module.default;
				});
		});
		console.log(v);
	}
}