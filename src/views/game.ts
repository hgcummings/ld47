import { View } from '.';
import GameModel from '../models/game';
import { CanvasRenderingContextPolar2D } from './helpers/polar';
import { Sprites } from './sprites';
import { Sprite } from '../models/sprite';

export default class implements View<GameModel> {
    context: CanvasRenderingContextPolar2D;
    width: number;
    height: number;
    unit: number;
    sprites: Sprites;
    lives: HTMLElement;

    constructor(canvas: HTMLCanvasElement, lives: HTMLElement) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.unit = Math.floor(Math.min(canvas.width, canvas.height) / 24);
        canvas.style.backgroundColor = '#33cc33';

        this.context = CanvasRenderingContextPolar2D.create(canvas);
        this.sprites = new Sprites(this.unit);
        this.lives = lives;
    }
    
    render(model: GameModel) {
        this.context.fillStyle = '#33cc33';
        this.context.fillCircle(this.unit * 24);

        let lastType = null;
        for (let i = model.grid.length - 1; i >= 0; --i) {
            const type = model.grid[i].type
            this.context.fillStyle = {
                'road': '#666666',
                'land': '#33cc33',
                'pond': '#3333cc'
            }[type];

            this.context.fillCircle(this.unit * (i + 1/2));

            if (type === 'road' && lastType === 'road') {
                const circumference = Math.PI * (1 + 2*i);
                const dashLength = (circumference / Math.round(circumference / (this.unit * 2))) / 2;

                this.context.setLineDash([dashLength, dashLength]);
                this.context.strokeStyle = '#cccccc';
                this.context.circle(this.unit * (i + 1/2));
                this.context.setLineDash([]);
            }

            lastType = type;
        }

        for (let lily of model.level.lilies) {
            this.renderSprite(this.sprites.lily, lily);
        }

        for (let car of model.level.cars) {
            this.renderSprite(this.sprites.car, car);
        }

        this.renderSprite(this.sprites.frog, model.frog);
        this.renderSprite(this.sprites.mask, model.frog);

        this.lives.innerText = 'Lives:' + ' 🐸'.repeat(model.lives);

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

    private renderSprite(sprite: HTMLCanvasElement, model: Sprite) {
        this.context.drawSprite(sprite, model.r * this.unit, model.t, model.facing);
    }
}