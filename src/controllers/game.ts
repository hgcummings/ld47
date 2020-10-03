import GameModel from '../models/game';

export default class {
    constructor(model: GameModel) {
        window.addEventListener('keydown', event => {
            switch (event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    model.frog.moveOut();
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    model.frog.moveIn();
                    break;
                case 'Delete':
                    if (event.ctrlKey) {
                        model.toggleDebug();
                    }
                    break;
                default:
                    break;
            }
        });
    }
}