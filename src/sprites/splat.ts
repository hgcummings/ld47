import { Sprite, FiniteSprite } from ".";

export class Splat extends Sprite implements FiniteSprite {
    active: boolean = true;
    startTime: number;

    constructor(r:number, t:number, time: number) {
        super(r, t, 0);
        this.startTime = time;
    }

    update(time: number) {
        super.update(time);
        if (time - this.startTime > 960) {
            this.active = false;
        }
    }

    get facing(): number {
        return this.t;
    }

    renderFrame(i: number, unit: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.width = unit;
        canvas.height = unit;
    
        const ctx = canvas.getContext('2d');
    
        ctx.fillStyle = '#333300';
        ctx.beginPath();
        ctx.ellipse(unit / 2, unit / 2, unit / 2, unit / 3, 0, 0, 2 * Math.PI);
        ctx.fill();
    
        ctx.fillStyle = '#666600';
        ctx.beginPath();
        ctx.ellipse(unit * 7 / 8, unit * 3 / 8, unit / 16, unit / 16, 0, 0, 2 * Math.PI);
        ctx.ellipse(unit * 7 / 8, unit * 5 / 8, unit / 16, unit / 16, 0, 0, 2 * Math.PI);
        ctx.fill();
    
        return canvas;
    }
}
