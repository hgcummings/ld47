import { Sprite } from ".";
import colours from "../views/colours";

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
        return this._facing + this.t;
    }

    renderFrame(i: number, unit: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.width = unit;
        canvas.height = unit;
    
        const ctx = canvas.getContext('2d');
    
        ctx.fillStyle = colours.LILY;
        ctx.beginPath();
        ctx.moveTo(unit / 2, unit / 2);
        ctx.bezierCurveTo(unit, unit / 2, unit * 7 / 8, unit * 15/16, unit / 2, unit * 15/16);
        ctx.arc(unit / 2, unit / 2, unit * 21 / 48, Math.PI / 2, 3 * Math.PI / 2);
        ctx.bezierCurveTo(unit * 7 / 8, unit / 16, unit, unit / 2, unit / 2, unit / 2);
        ctx.fill();
    
        return canvas;
    }
}
