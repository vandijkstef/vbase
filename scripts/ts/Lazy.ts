class Lazy extends VBase {

	private images: NodeListOf<HTMLImageElement>;

	constructor() {
		super();
		this.images = document.querySelectorAll('img.lazy');
		this.Lazyfi();
	}

	private Refresh() {
		this.images = document.querySelectorAll('img.lazy');
	}

	private Lazyfi() {
		this.Refresh();
		setTimeout(() => {
			if (this.images.length > 0) {
				this.images.forEach((image) => {
					if (this.InViewport(image)) {
						this.Load(image);
					}
				});
				this.Lazyfi();
			} else {
				console.log('No more lazies');
			}
		}, 500);
	}

	private Load(image) {
		if (image.classList.contains('lazy') && image.src !== image.dataset.src && !image.classList.contains('loading')) {
			// Preload the image
			const img: HTMLImageElement = new Image();
			image.classList.add('loading');
			img.onload = () => {
				image.src = img.src;
				image.classList.remove('lazy');
			};
			img.src = image.dataset.src;
		} else if (image.src === image.dataset.src) {
			image.classList.remove('lazy');
		}
	}

	private InViewport(image) { // This doesn't work in scrollwindows
		let top = image.offsetTop;
		let left = image.offsetLeft;
		const width = image.offsetWidth;
		const height = image.offsetHeight;

		while (image.offsetParent) {
			image = image.offsetParent;
			top += image.offsetTop;
			left += image.offsetLeft;
		}

		const scope = window;
		return (
			top < (scope.pageYOffset + scope.innerHeight) &&
			left < (scope.pageXOffset + scope.innerWidth) &&
			(top + height) > scope.pageYOffset &&
			(left + width) > scope.pageXOffset
		);
	}
}
