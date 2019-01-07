interface ImageViewerSettings {
	rotate: boolean;
	direction: number;
	rotateTime: number;
	clickable: boolean;
	controls: boolean;
	fx: boolean;
}

interface IViewerImage extends HTMLImageElement {
	viewer: Imageviewer;
}

interface IViewerButton extends HTMLButtonElement {
	viewer: Imageviewer;
	parentNode: HTMLElement;
}

class Imageviewer extends VBaseHTML {
	// Image viewer

	private settings: ImageViewerSettings;
	private index: number;
	private mainImage: HTMLImageElement;
	private grid: HTMLElement;
	private images: NodeListOf<IViewerImage>;
	private viewer: Imageviewer;
	private rotation: any;

	constructor(mainWrap: HTMLElement, gridWrap: HTMLElement, options: ImageViewerSettings) {
		// TODO: Test and implement these variables
		super(document.querySelector('#images .main img')); // TODO: This has to be a wrapper?
		// Settings
		this.settings = {
			clickable: true,
			controls: true,
			direction: 1,
			fx: true,
			rotate: true,
			rotateTime: 2,
		};

		// Setup
		this.index = 0;

		this.mainImage = document.querySelector('#images .main img');
		this.grid = document.querySelector('#images #productAdditionalImages .grid');

		if (this.grid) {
			this.MainToGrid();
			if (this.settings.rotate) {
				this.Rotate(true);
			}

			if (this.settings.clickable) {
				this.images.forEach((image) => {
					image.viewer = this;
					image.addEventListener('click', this.ClickImage);
				});
			}

			if (this.settings.controls) {
				this.Controls();
			}
		}
	}

	// Set the viewer to the current index
	private Set() {
		const newImg = this.images[this.index];
		let img;
		if (newImg.src !== this.mainImage.src) {
			if (this.settings.fx === true) {
				img = document.createElement('img');
				img.src = newImg.src;
				img.classList.add('new');
				this.mainImage.parentElement.appendChild(img);
				this.mainImage.classList.add('fade');
				this.rotation = setTimeout(() => {
					this.mainImage.src = img.src;
					this.mainImage.classList.remove('fade');
					img.parentElement.removeChild(img);
				}, 600);
			} else {
				img = this.mainImage;
				this.mainImage.src = newImg.src;
			}
			if (typeof(Lazy) === 'function' && newImg.dataset.src) { // TODO: test for Lazy() class
				img.dataset.src = newImg.dataset.src;
				if (img.src !== img.dataset.src) {
					img.classList.add('lazy');
					if (img !== this.mainImage) {
						this.mainImage.classList.add('lazy');
					}
				}
			}
			this.UpdateSelection(newImg);
		}
	}

	private UpdateSelection(img) {
		const oldSelection = document.querySelector('img.selected');
		if (oldSelection) {
			oldSelection.classList.remove('selected');
		}
		img.classList.add('selected');
	}

	private Next() {
		const viewer = this.viewer || this;
		viewer.index++;
		if (viewer.index > viewer.images.length - 1) {
			viewer.index = 0;
		}
		viewer.Set();
	}

	private Prev() {
		const viewer = this.viewer || this;
		viewer.index--;
		if (viewer.index < 0) {
			viewer.index = viewer.images.length - 1;
		}
		viewer.Set();
	}

	private Rotate(skipMove: boolean = false) {
		if (!skipMove) {
			if (this.settings.direction) {
				this.Next();
			} else {
				this.Prev();
			}
		}
		setTimeout(() => {
			this.Rotate();
		}, this.settings.rotateTime * 1000);
	}

	private ClickImage(this: IViewerButton) { // TODO: Test how this is handled in compile
		this.viewer.index = [...this.parentNode.children].indexOf(this);
		this.viewer.Set();
		if (this.viewer.rotation) {
			clearTimeout(this.viewer.rotation);
			this.viewer.Rotate(true);
		}
	}

	private Controls() {
		// Create buttons
		const container = this.mainImage.parentElement;
		const btn: HTMLButtonElement = document.createElement('button');
		btn.type = 'button';

		const btnPrev = btn.cloneNode() as IViewerButton;
		btnPrev.innerText = '<';
		btnPrev.addEventListener('click', this.Prev);
		btnPrev.viewer = this;
		const btnNext = btn.cloneNode() as IViewerButton;
		btnNext.innerText = '>';
		btnNext.viewer = this;
		btnNext.addEventListener('click', this.Next);

		container.appendChild(btnPrev);
		container.appendChild(btnNext);
	}

	// Add main image to the grid of additional images.
	// It has no use for the main image to be rendered by the server,
	// when the page isn't interactive
	private MainToGrid() {
		const newImage = this.mainImage.cloneNode() as HTMLImageElement;
		newImage.src = this.mainImage.dataset.src || this.mainImage.src;
		newImage.width = 800;
		this.grid.insertBefore(newImage, this.grid.querySelector('img'));
		this.images = this.grid.querySelectorAll('img') as NodeListOf<IViewerImage>;
		this.images[0].classList.add('selected');
	}
}
