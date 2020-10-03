import { Sprite } from "./sprite";

export class Frog extends Sprite {


    moveClockwise() {
        this.t += this.jumpAngle();
    }

    moveAntiClockwise() {
        this.t -= this.jumpAngle();
    }

    moveOut() {
        this.r += 1;
    }

    moveIn() {
        this.r = Math.max(this.r - 1, 0);
    }

    private jumpAngle() {
        return Math.PI / 3 / Math.max(1, this.r);
    }
}