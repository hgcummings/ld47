import GameModel from '../models/game';

export default class {
    model: GameModel;

    constructor(model: GameModel) {
        this.model = model;

        window.addEventListener('keyup', event => {
            this.model.toggleDebug();
        });
    }
}