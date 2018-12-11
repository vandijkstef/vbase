class Menu {
    constructor() {
        document.querySelector('.navList').addEventListener('click', this.UnfocusOnClick);
        this.mainMenu = document.querySelector('nav#main');
        this.mainMenu.classList.add('js');
        this.mainMenu.addEventListener('click', this.MainMenu);
    }
    UnfocusOnClick(e) {
        if (e.target === this) {
            this.classList.add('unhover');
            setTimeout(() => {
                this.classList.remove('unhover');
            }, 200);
        }
    }
    MainMenu(e) {
        if (e.target === this) {
            this.classList.toggle('open');
        }
    }
}
