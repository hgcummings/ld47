import { Controller } from ".";

export default class implements Controller {
    handler: (event: any) => void;
    onExit: () => void;

    enter(exitCallback: () => void) {
        const title = document.getElementById('title');
        title.style.display = 'block';
        window.addEventListener('keydown', this.handler);

        this.onExit = exitCallback;
    }

    update() {}

    exit() {
        const title = document.getElementById('title');
        title.style.display = 'none';
        window.removeEventListener('keydown', this.handler);
        this.onExit();
    }

    constructor() {
        this.handler = () => {
            this.exit();
        }
    }
}