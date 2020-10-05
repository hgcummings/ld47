import { Sprite } from ".";
import * as sounds from '../sounds';
import colours from "../views/colours";

export class Frog extends Sprite {
    active: boolean = true;
    maxR: number = 0;
    lastSound = null;

    end() {
        this.active = false;
    }

    moveClockwise() {
        if (this.active) {
            this.t += this.jumpAngle();
            this.lastSound = sounds.jumpT;
        }
    }

    moveAntiClockwise() {
        if (this.active) {
            this.t -= this.jumpAngle();
            this.lastSound = sounds.jumpT;
        }
    }

    moveOut() {
        if (this.active) {
            this.r += 1;
            this.lastSound = sounds.jumpR;
        }
    }

    moveIn() {
        if (this.active) {
            this.r = Math.max(this.r - 1, 0);
            this.lastSound = sounds.jumpR;
        }
    }

    get facing(): number {
        return this.t;
    }

    private jumpAngle() {
        return Math.PI / 3 / Math.max(1, this.r);
    }

    renderFrame(i: number, unit: number): HTMLCanvasElement {
        return Frog.render(unit, colours.FROG);
    }

    static render(unit:number, colour: string): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.width = unit;
        canvas.height = unit;
    
        const ctx = canvas.getContext('2d');
    
        ctx.strokeStyle = colour;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0.1 * unit, 0.2 * unit);
        ctx.lineTo(0.4 * unit, 0.2 * unit);
        ctx.lineTo(0.7 * unit, 0.8 * unit);
        ctx.lineTo(0.9 * unit, 0.8 * unit);

        ctx.moveTo(0.1 * unit, 0.8 * unit);
        ctx.lineTo(0.4 * unit, 0.8 * unit);
        ctx.lineTo(0.7 * unit, 0.2 * unit);
        ctx.lineTo(0.9 * unit, 0.2 * unit);
        ctx.stroke();

        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.ellipse(unit / 2, unit / 2, unit * 4 / 12, unit * 3 / 12, 0, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(unit * 3 / 4, unit * 3 / 8, unit * 3 / 32, unit * 3 / 32, 0, 0, 2 * Math.PI);
        ctx.ellipse(unit * 3 / 4, unit * 5 / 8, unit * 3 / 32, unit * 3 / 32, 0, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.ellipse(unit * 3 / 4, unit * 3 / 8, unit / 16, unit / 16, 0, -Math.PI / 2, Math.PI / 2);
        ctx.ellipse(unit * 3 / 4, unit * 5 / 8, unit / 16, unit / 16, 0, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
    
        return canvas;
    }
}