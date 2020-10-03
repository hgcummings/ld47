import { View } from '.';
import GameModel from '../models/game';
import { CanvasRenderingContextPolar2D } from './helpers/polar';
import { Sprites } from './sprites';

export default class implements View<GameModel> {
    context: CanvasRenderingContextPolar2D;
    width: number;
    height: number;
    unit: number;
    sprites: Sprites;

    constructor(canvas: HTMLCanvasElement) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.unit = Math.floor(Math.min(canvas.width, canvas.height) / 24);
        canvas.style.backgroundColor = '#33cc33';

        this.context = CanvasRenderingContextPolar2D.create(canvas);
        this.sprites = new Sprites(this.unit);
    }
    
    render(model: GameModel) {
        this.context.fillStyle = '#33cc33';
        this.context.fillCircle(this.unit * 24);


        for (let i = model.grid.length - 1; i >= 0; --i) {
            this.context.fillStyle = {
                'road': '#666666',
                'land': '#33cc33',
                'pond': '#3333cc'
            }[model.grid[i].type];

            this.context.fillCircle(this.unit * (i + 1/2));
        }

        for (let lily of model.level.lilies) {
            this.context.drawSprite(this.sprites.lily, lily.r * this.unit, lily.t);
        }

        if (model.debug) {
            this.context.strokeStyle = '#ffcc33';
            for (let i = 1; i < model.grid.length; ++i) {
                const row = model.grid[i];
                const fromR = this.unit * (1 + (2 * (i - 1))) / 2;
                const toR = fromR + this.unit;
                this.context.circle(fromR);
                const step = 2 * Math.PI / row.tiles;
                const offset = 1 / 2;
                for (let j = 0; j < row.tiles; ++j) {
                    this.context.beginPath()
                    this.context.moveTo(fromR, (offset + j) * step);
                    this.context.lineTo(toR, (offset + j) * step);
                    this.context.stroke();
                }
            }
        }
    }
}