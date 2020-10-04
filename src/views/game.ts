import { View } from '.';
import GameModel from '../models/game';
import { CanvasRenderingContextPolar2D } from './helpers/polar';
import { Sprite } from '../sprites';

export default class implements View<GameModel> {
    context: CanvasRenderingContextPolar2D;
    width: number;
    height: number;
    unit: number;
    mask: HTMLCanvasElement;
    home: HTMLCanvasElement;
    lives: HTMLElement;

    constructor(canvas: HTMLCanvasElement, lives: HTMLElement) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.unit = Math.floor(Math.min(canvas.width, canvas.height) / 24);

        this.context = CanvasRenderingContextPolar2D.create(canvas);
        this.mask = this.renderMask();
        this.home = this.renderHome();
        this.lives = lives;
    }
    
    render(model: GameModel) {
        this.context.fillStyle = '#33cc33';
        this.context.fillCircle(this.unit * 24);

        this.context.fillStyle = '#666666';
        this.context.context.fillRect(-this.width / 2, -this.unit * 5 / 2, this.width, (this.unit * 5));
        this.context.context.fillRect(-this.unit * 5 / 2, -this.width / 2, (this.unit * 5), this.width);

        let lastType = null;
        for (let i = model.grid.length - 1; i >= 0; --i) {
            const type = model.grid[i].type

            if (type === 'home') {
                continue;
            }

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

        this.lives.innerText = 'Lives:' + ' 🐸'.repeat(model.lives);

        for (let home = 0; home < model.level.homes.length; ++home) {
            if (model.level.homes[home]) {
                const t = model.homeT(home);
                this.context.drawSprite(this.home, (8 * this.unit) + (this.home.width / 2), t, t);
            }
        }

        if (model.death) {
            this.renderSprite(model.death);
        }

        for (let lily of model.level.lilies) {
            this.renderSprite(lily);
        }

        for (let car of model.level.cars) {
            this.renderSprite(car);
        }

        if (model.frog.alive) {
            this.renderSprite(model.frog);
        }

        if (!model.debug) {
            this.renderImageForSprite(this.mask, model.frog);
        } else {
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

    private renderSprite(sprite: Sprite) {
        this.renderImageForSprite(sprite.getCurrentFrame(this.unit), sprite);
    }

    private renderImageForSprite(image: HTMLCanvasElement, sprite: Sprite) {
        this.context.drawSprite(image, sprite.r * this.unit, sprite.t, sprite.facing);
    }

    private renderHome() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = 15 * this.unit;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#990000';
        ctx.fillRect(this.unit * 6, this.unit * 25 / 4, this.unit * 3 / 2, this.unit * 5 / 2);

        ctx.fillStyle = '#cccccc';
        for (let i = 0; i < 3; ++i) {
            ctx.beginPath();
            ctx.ellipse((this.unit * 4.15) + (i * this.unit * 3 / 4), this.unit * 15 / 2, this.unit * 5 / 16, this.unit * 3 / 8, 0, 0, 2 * Math.PI);
            ctx.fill();
        }

        const drawFence = () => {
            ctx.beginPath();
            ctx.moveTo(this.unit * 6.3, - this.unit * 3);
            ctx.arc(-8 * this.unit, this.unit * 15 / 2, this.unit * 11.75, - 0.55, 0.55);
            ctx.lineTo(this.unit * 6.3, this.unit * 18);
        }

        ctx.strokeStyle = '#ffffff';
        drawFence();
        ctx.stroke();
        ctx.setLineDash([this.unit / 8, this.unit / 8]);
        ctx.lineWidth = 3;
        drawFence()
        ctx.stroke();

        return canvas;
    }

    private renderMask() {
        const canvas = document.createElement('canvas');
        canvas.width = this.unit * 64;
        canvas.height = this.unit * 64;
    
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
    
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx.globalCompositeOperation = 'xor';
    
        ctx.filter = `blur(${this.unit}px)`;
    
    
        ctx.beginPath();
        ctx.ellipse(
            (this.unit * 3) + (canvas.width / 2),
            canvas.height / 2,
            this.unit * 9,
            this.unit * 6,
            0,
            0,
            2 * Math.PI);

        ctx.fill();
    
        return canvas;
    }
}