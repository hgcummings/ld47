import { View } from '.';
import GameModel from '../models/game';

export default class implements View<GameModel> {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.width = canvas.width;
        this.height = canvas.height;

        this.context = canvas.getContext('2d');
    }
    
    render(model: GameModel) {
        this.context.fillStyle = model.debug ? '#ffcc33' : '#663366';
        this.context.fillRect(0, 0, this.width, this.height);
    }
}