import { Sprite } from ".";

export class Car extends Sprite {
    private _frame: HTMLCanvasElement;
    private _unit: number;

    constructor(r:number, t:number, speed:number) {
        super(r, t, speed);
    }

    update(time: number) {
        super.update(time);
    }

    get facing(): number {
        return this.t + Math.PI / 2;
    }

    renderFrame(i: number, unit: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.width = unit;
        canvas.height = unit;
    
        const ctx = canvas.getContext('2d');
    
        ctx.fillStyle = '#ccccff';
        ctx.fillRect(0, unit / 4, unit, unit / 2);
    
        ctx.fillStyle = '#333333';
        ctx.beginPath();
        ctx.moveTo(unit / 4, unit / 4);
        ctx.lineTo(unit / 4, unit * 3 / 4);
        ctx.lineTo(unit * 3 / 8, unit * 11/16);
        ctx.lineTo(unit * 3 / 8, unit * 5/16);
        ctx.lineTo(unit / 4, unit / 4);
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(unit * 3 / 4, unit / 4);
        ctx.lineTo(unit * 3 / 4, unit * 3 / 4);
        ctx.lineTo(unit * 5 / 8, unit * 11/16);
        ctx.lineTo(unit * 5 / 8, unit * 5/16);
        ctx.lineTo(unit * 3 / 4, unit / 4);
        ctx.fill();
    
        ctx.fillStyle = '#ccff99';
        ctx.beginPath();
        ctx.moveTo(unit * 31 / 32, unit / 4);
        ctx.lineTo(unit * 31 / 32, unit * 11 / 32);
        ctx.lineTo(unit, unit * 3 / 8);
        ctx.lineTo(unit, unit / 4);
        ctx.lineTo(unit * 31 / 32, unit / 4);
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(unit * 31 / 32, unit * 3 / 4);
        ctx.lineTo(unit * 31 / 32, unit * 21 / 32);
        ctx.lineTo(unit, unit * 5 / 8);
        ctx.lineTo(unit, unit * 3 / 4);
        ctx.lineTo(unit * 31 / 32, unit * 3 / 4);
        ctx.fill();
    
        ctx.fillStyle = '#ff6633';
        ctx.beginPath();
        ctx.moveTo(unit / 32, unit / 4);
        ctx.lineTo(unit / 32, unit * 11 / 32);
        ctx.lineTo(0, unit * 3 / 8);
        ctx.lineTo(0, unit / 4);
        ctx.lineTo(unit / 32, unit / 4);
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(unit / 32, unit * 3 / 4);
        ctx.lineTo(unit / 32, unit * 21 / 32);
        ctx.lineTo(0, unit * 5 / 8);
        ctx.lineTo(0, unit * 3 / 4);
        ctx.lineTo(unit / 32, unit * 3 / 4);
        ctx.fill();
    
        return canvas;
    }
}