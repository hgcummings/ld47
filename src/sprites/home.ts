import { Sprite, FiniteSprite } from ".";

export class Home extends Sprite implements FiniteSprite {
    active: boolean = true;
    startTime: number;
    private _frame: number;

    constructor(i:number, time: number) {
        super(20, Home.angle(i), 0);
        this.startTime = time;
    }

    update(time: number) {
        super.update(time);
        this._frame = Math.floor((time - this.startTime) / 80);
        if (this._frame > 12) {
            this.active = false;
        }
    }

    get facing(): number {
        return this.t;
    }

    get frameIndex(): number {
        return Math.min(this._frame, 12);
    }

    renderFrame(i: number, unit: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.width = unit * 24;
        canvas.height = 15 * unit;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#990000';
        ctx.fillRect(unit * 6, unit * 25 / 4, unit * 3 / 2, unit * 5 / 2);

        ctx.fillStyle = '#cccccc';
        for (let i = 0; i < 3; ++i) {
            ctx.beginPath();
            ctx.ellipse((unit * 4.15) + (i * unit * 3 / 4), unit * 15 / 2, unit * 5 / 16, unit * 3 / 8, 0, 0, 2 * Math.PI);
            ctx.fill();
        }

        const drawFence = () => {
            ctx.beginPath();
            ctx.moveTo(unit * 6.3, -unit * 3);
            ctx.arc(-8 * unit, unit * 15 / 2, unit * 11.75, - 0.55, 0.55);
            ctx.lineTo(unit * 6.3, unit * 18);
        }

        ctx.strokeStyle = '#ffffff';
        drawFence();
        ctx.stroke();
        ctx.setLineDash([unit / 8, unit / 8]);
        ctx.lineWidth = 3;
        drawFence()
        ctx.stroke();

        return canvas;
    }

    static angle(i):number {
        return Math.PI * ((1/4) + (i / 2));
    }
}
