import { View } from '.';
import GameModel from '../models/game';
import { CanvasRenderingContextPolar2D } from './helpers/polar';

export default class implements View<GameModel> {
    context: CanvasRenderingContextPolar2D;
    width: number;
    height: number;
    unit: number;

    constructor(canvas: HTMLCanvasElement) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.unit = Math.floor(Math.min(canvas.width, canvas.height) / 24);
        canvas.style.backgroundColor = '#33cc33';

        this.context = CanvasRenderingContextPolar2D.create(canvas);
    }
    
    render(model: GameModel) {
        this.context.fillStyle = '#33cc33';
        this.context.fillCircle(this.unit * 24);
        this.context.fillStyle = '#666666';
        this.context.fillCircle(this.unit * 21 / 2);
        this.context.fillStyle = '#33cc33';
        this.context.fillCircle(this.unit * 11 / 2);
        this.context.fillStyle = '#3333cc';
        this.context.fillCircle(this.unit * 9 / 2);

        if (model.debug) {
            this.context.strokeStyle = '#ffcc33';
            for (let i = 0; i < 12; ++i) {
                const fromR = this.unit * (1 + (2 * i)) / 2;
                const toR = fromR + this.unit;
                this.context.circle(fromR);
                const steps = [6,12,24,24,24,48,48,48,48,48,96][i];
                const step = 2 * Math.PI / steps;
                const offset = 1 / 2;
                for (let j = 0; j < steps; ++j) {
                    this.context.beginPath()
                    this.context.moveTo(fromR, (offset + j) * step);
                    this.context.lineTo(toR, (offset + j) * step);
                    this.context.stroke();
                }
            }
        }
    }
}