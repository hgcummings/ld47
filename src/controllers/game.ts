import GameModel from '../models/game';

export default class {
    constructor(model: GameModel) {
        window.addEventListener('keydown', event => {
            switch (event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    model.frog.moveOut();
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    model.frog.moveAntiClockwise();
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    model.frog.moveIn();
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    model.frog.moveClockwise();
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