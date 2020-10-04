import { Sprite, FiniteSprite } from ".";

export class Splosh extends Sprite implements FiniteSprite {
    active: boolean = true;
    startTime: number;
    private _frame: number;

    constructor(r:number, t:number, time: number) {
        super(r, t, 0);
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
        canvas.width = unit;
        canvas.height = unit;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#3333cc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let j = 0; j < 3; ++j) {
            const r = i - (2 * j) + 1;
            if (r > 0 && r < 9) {
                ctx.strokeStyle = `rgba(255,255,255,${1 - (r / 8)})`;
                ctx.beginPath();
                ctx.ellipse(unit / 2, unit / 2, r * unit / 16, r * unit / 16, 0, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }

        return canvas;
    }
}
