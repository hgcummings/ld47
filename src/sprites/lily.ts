import { Sprite } from ".";

export class Lily extends Sprite {
    private _facing: number;

    constructor(r:number, t:number, speed:number) {
        super(r, t, speed);
        this._facing = Math.random() * 2 * Math.PI;
    }

    update(time: number) {
        super.update(time);
    }

    get facing(): number {
        return this._facing;
    }

    renderFrame(i: number, unit: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.width = unit;
        canvas.height = unit;
    
        const ctx = canvas.getContext('2d');
    
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(unit / 2, unit / 2, unit * 21 / 48, 0, 2 * Math.PI);
        ctx.fill();
    
        return canvas;
    }
}
