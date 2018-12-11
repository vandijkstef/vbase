class Imageviewer {
	// Image viewer
	// Setup rotation
	// Setup control buttons
	// Setup change on click/hover
	// Setup auto rotation
	constructor() {
		// Settings
		this.settings = {
			rotate: true,
			direction: 1,
			rotateTime: 8,
			clickable: true,
			controls: true
		};

		// Actual code below this line
		this._index = 0;

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

	// Add main image to the grid of additional images. It has no use for the main image to be rendered by the server, when the page isn't interactive
	MainToGrid() {
		const newImage = this.mainImage.cloneNode();
		newImage.src = this.mainImage.dataset.src || this.mainImage.src;
		newImage.width = 800;
		this.grid.insertBefore(newImage, this.grid.querySelector('img'));
		this.images = this.grid.querySelectorAll('img');
	}

	// Set the viewer to the current index
	Set() {
		const newImg = this.images[this._index];
		if (newImg.src !== this.mainImage.src) {
			this.mainImage.src = newImg.src;
			if (newImg.dataset.src) {
				this.mainImage.dataset.src = newImg.dataset.src;
				const oldSelection = document.querySelector('img.selected');
				if (oldSelection) {
					oldSelection.classList.remove('selected');
				}
				newImg.classList.add('selected');
				if (this.mainImage.src != this.mainImage.dataset.src) {
					this.mainImage.classList.add('lazy');
				}
			}
		}
	}

	Next() {
		const viewer = this.viewer || this;
		viewer._index++;
		if (viewer._index > viewer.images.length - 1) {
			viewer._index = 0;
		}
		viewer.Set();
	}

	Prev() {
		const viewer = this.viewer || this;
		viewer._index--;
		if (viewer._index < 0) {
			viewer._index = viewer.images.length - 1;
		}
		viewer.Set();
	}

	Rotate(skipMove) {
		if (!skipMove) {
			if (this.settings.direction) {
				this.Next();
			} else {
				this.Prev();
			}
		}
		this.rotation = setTimeout(() => {
			this.Rotate();
		}, this.settings.rotateTime * 1000);
	}

	ClickImage() {
		this.viewer._index = [...this.parentNode.children].indexOf(this);
		this.viewer.Set();
		if (this.viewer.rotation) {
			clearTimeout(this.viewer.rotation);
			this.viewer.Rotate(true);
		}
	}

	Controls() {
		// Create buttons
		const container = this.mainImage.parentElement;
		const btn = document.createElement('button');
		btn.type = 'button';

		const btnPrev = btn.cloneNode();
		btnPrev.innerText = '<';
		btnPrev.addEventListener('click', this.Prev);
		btnPrev.viewer = this;
		const btnNext = btn.cloneNode();
		btnNext.innerText = '>';
		btnNext.viewer = this;
		btnNext.addEventListener('click', this.Next);

		container.appendChild(btnPrev);
		container.appendChild(btnNext);
	}
}