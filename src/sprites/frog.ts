import { Sprite } from ".";
import * as sounds from '../sounds';

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
        const canvas = document.createElement('canvas');
        canvas.width = unit;
        canvas.height = unit;
    
        const ctx = canvas.getContext('2d');
    
        ctx.fillStyle = '#669933';
        ctx.beginPath();
        ctx.ellipse(unit / 2, unit / 2, unit / 2, unit / 3, 0, 0, 2 * Math.PI);
        ctx.fill();
    
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.ellipse(unit * 7 / 8, unit * 3 / 8, unit / 16, unit / 16, 0, 0, 2 * Math.PI);
        ctx.ellipse(unit * 7 / 8, unit * 5 / 8, unit / 16, unit / 16, 0, 0, 2 * Math.PI);
        ctx.fill();
    
        return canvas;
    }
}